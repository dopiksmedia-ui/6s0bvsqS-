import { Hono } from 'hono';
import type { AppContext, BookingSlot, Booking } from '../types';
import { 
  generateBookingNumber, 
  formatDate, 
  getDayOfWeek,
  generateTimeSlots,
  isPastDate,
  isValidPhone,
  isValidEmail,
  getClientIp,
  getUserAgent
} from '../lib/utils';
import { bookingRateLimit } from '../middleware/rateLimit';

const booking = new Hono<AppContext>();

/**
 * GET /api/booking/available-dates
 * Get available booking dates for a given month
 */
booking.get('/available-dates', async (c) => {
  const month = c.req.query('month'); // Format: YYYY-MM
  
  if (!month) {
    return c.json({ success: false, error: 'Month parameter required' }, 400);
  }
  
  try {
    // Get all configured slot days
    const { results: slots } = await c.env.DB.prepare(
      'SELECT DISTINCT day_of_week FROM booking_slots WHERE is_active = 1'
    ).all<{ day_of_week: number }>();
    
    const activeDays = new Set(slots.map(s => s.day_of_week));
    
    // Get exception dates
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);
    
    const { results: exceptions } = await c.env.DB.prepare(
      'SELECT exception_date, is_available FROM booking_exceptions WHERE exception_date >= ? AND exception_date <= ?'
    ).bind(formatDate(startDate), formatDate(endDate)).all<{ exception_date: string; is_available: number }>();
    
    const exceptionMap = new Map(exceptions.map(e => [e.exception_date, e.is_available === 1]));
    
    // Generate available dates
    const availableDates: string[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = formatDate(currentDate);
      const dayOfWeek = getDayOfWeek(currentDate);
      
      // Check if date is in the past
      if (isPastDate(dateStr)) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      
      // Check exceptions
      if (exceptionMap.has(dateStr)) {
        if (exceptionMap.get(dateStr)) {
          availableDates.push(dateStr);
        }
      } else if (activeDays.has(dayOfWeek)) {
        availableDates.push(dateStr);
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return c.json({
      success: true,
      data: {
        month,
        dates: availableDates
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch available dates'
    }, 500);
  }
});

/**
 * GET /api/booking/available-slots
 * Get available time slots for a specific date
 */
booking.get('/available-slots', async (c) => {
  const date = c.req.query('date'); // Format: YYYY-MM-DD
  
  if (!date) {
    return c.json({ success: false, error: 'Date parameter required' }, 400);
  }
  
  try {
    const dateObj = new Date(date);
    const dayOfWeek = getDayOfWeek(dateObj);
    
    // Check if date is in the past
    if (isPastDate(date)) {
      return c.json({ success: false, error: 'Cannot book past dates' }, 400);
    }
    
    // Check for exceptions
    const exception = await c.env.DB.prepare(
      'SELECT * FROM booking_exceptions WHERE exception_date = ?'
    ).bind(date).first<{ is_available: number; special_hours: string }>();
    
    if (exception && exception.is_available === 0) {
      return c.json({
        success: true,
        data: {
          date,
          slots: [],
          message: 'This date is not available for booking'
        }
      });
    }
    
    // Get time slots for this day
    const { results: slotConfigs } = await c.env.DB.prepare(
      'SELECT * FROM booking_slots WHERE day_of_week = ? AND is_active = 1'
    ).bind(dayOfWeek).all<BookingSlot>();
    
    if (slotConfigs.length === 0) {
      return c.json({
        success: true,
        data: {
          date,
          slots: []
        }
      });
    }
    
    // Generate all possible time slots
    const allSlots: string[] = [];
    for (const config of slotConfigs) {
      const slots = generateTimeSlots(config.start_time, config.end_time, config.slot_duration);
      allSlots.push(...slots);
    }
    
    // Get already booked slots
    const { results: bookedSlots } = await c.env.DB.prepare(
      'SELECT booking_time FROM bookings WHERE booking_date = ? AND status IN (?, ?)'
    ).bind(date, 'pending', 'confirmed').all<{ booking_time: string }>();
    
    const bookedTimes = new Set(bookedSlots.map(b => b.booking_time));
    
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));
    
    return c.json({
      success: true,
      data: {
        date,
        slots: availableSlots
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch available slots'
    }, 500);
  }
});

/**
 * POST /api/booking/create
 * Create a new booking
 */
booking.post('/create', bookingRateLimit, async (c) => {
  const lang = c.get('lang');
  
  try {
    const body = await c.req.json();
    const {
      patient_name,
      patient_phone,
      patient_email,
      consultation_type,
      booking_date,
      booking_time,
      reason,
      consent_privacy
    } = body;
    
    // Validation
    if (!patient_name || !patient_phone || !booking_date || !booking_time) {
      return c.json({
        success: false,
        error: 'Missing required fields'
      }, 400);
    }
    
    if (!isValidPhone(patient_phone)) {
      return c.json({
        success: false,
        error: lang === 'ar' ? 'رقم الجوال غير صحيح' : 'Invalid phone number'
      }, 400);
    }
    
    if (patient_email && !isValidEmail(patient_email)) {
      return c.json({
        success: false,
        error: lang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address'
      }, 400);
    }
    
    if (!consent_privacy) {
      return c.json({
        success: false,
        error: lang === 'ar' ? 'يجب الموافقة على سياسة الخصوصية' : 'Privacy policy consent required'
      }, 400);
    }
    
    // Check if date is available
    if (isPastDate(booking_date)) {
      return c.json({
        success: false,
        error: lang === 'ar' ? 'لا يمكن الحجز في تاريخ ماضي' : 'Cannot book past dates'
      }, 400);
    }
    
    // Check if slot is still available
    const existingBooking = await c.env.DB.prepare(
      'SELECT id FROM bookings WHERE booking_date = ? AND booking_time = ? AND status IN (?, ?)'
    ).bind(booking_date, booking_time, 'pending', 'confirmed').first();
    
    if (existingBooking) {
      return c.json({
        success: false,
        error: lang === 'ar' ? 'هذا الموعد محجوز بالفعل' : 'This slot is already booked'
      }, 400);
    }
    
    // Create booking
    const bookingNumber = generateBookingNumber();
    const ipAddress = getClientIp(c.req.raw);
    const userAgent = getUserAgent(c.req.raw);
    
    const consultationCol = lang === 'ar' ? 'consultation_type_ar' : 'consultation_type_en';
    const result = await c.env.DB.prepare(`
      INSERT INTO bookings (
        booking_number, patient_name, patient_phone, patient_email,
        ${consultationCol}, booking_date, booking_time,
        reason, status, consent_privacy, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      bookingNumber, patient_name, patient_phone, patient_email,
      consultation_type || 'General Consultation', booking_date, booking_time,
      reason, 'pending', 1, ipAddress, userAgent
    ).run();
    
    // Fetch created booking
    const createdBooking = await c.env.DB.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).bind(result.meta.last_row_id).first<Booking>();
    
    return c.json({
      success: true,
      data: createdBooking,
      message: lang === 'ar' 
        ? 'تم حجز موعدك بنجاح! ستصلك رسالة تأكيد قريباً.' 
        : 'Your appointment has been booked successfully! You will receive a confirmation message soon.'
    }, 201);
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to create booking'
    }, 500);
  }
});

/**
 * GET /api/booking/verify
 * Verify booking status by booking number
 */
booking.get('/verify', async (c) => {
  const bookingNumber = c.req.query('booking_number');
  
  if (!bookingNumber) {
    return c.json({ success: false, error: 'Booking number required' }, 400);
  }
  
  try {
    const booking = await c.env.DB.prepare(
      'SELECT * FROM bookings WHERE booking_number = ?'
    ).bind(bookingNumber).first<Booking>();
    
    if (!booking) {
      return c.json({
        success: false,
        error: 'Booking not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: booking
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to verify booking'
    }, 500);
  }
});

export default booking;
