import { Hono } from 'hono';
import type { AppContext } from '../types';
import { getNavigation } from '../components/navigation';
import { getFooter } from '../components/footer';

const bookingPage = new Hono<AppContext>();

/**
 * GET /booking
 * Booking page with interactive calendar
 */
bookingPage.get('/', (c) => {
  const lang = c.get('lang');
  
  return c.html(`
<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang === 'ar' ? 'احجز موعدك' : 'Book Your Appointment'} - Dr. Ahmed</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        .calendar-day { @apply w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all; }
        .calendar-day:hover:not(.disabled):not(.past) { @apply bg-blue-100; }
        .calendar-day.selected { @apply bg-blue-600 text-white font-semibold; }
        .calendar-day.disabled { @apply bg-gray-100 text-gray-400 cursor-not-allowed; }
        .calendar-day.past { @apply text-gray-300 cursor-not-allowed; }
        .calendar-day.available { @apply bg-white border-2 border-blue-200; }
        .time-slot { @apply px-4 py-3 rounded-lg border-2 border-gray-300 cursor-pointer transition-all text-center; }
        .time-slot:hover:not(.booked) { @apply border-blue-500 bg-blue-50; }
        .time-slot.selected { @apply bg-blue-600 text-white border-blue-600 font-semibold; }
        .time-slot.booked { @apply bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200; }
        .step { @apply flex items-center justify-center w-10 h-10 rounded-full font-semibold; }
        .step.active { @apply bg-blue-600 text-white; }
        .step.completed { @apply bg-green-500 text-white; }
        .step.inactive { @apply bg-gray-200 text-gray-500; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    ${getNavigation(lang, '/booking')}

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-12">
        <!-- Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                ${lang === 'ar' ? '📅 احجز موعدك' : '📅 Book Your Appointment'}
            </h1>
            <p class="text-lg text-gray-600">
                ${lang === 'ar' 
                    ? 'املأ النموذج أدناه لحجز استشارتك' 
                    : 'Fill out the form below to book your consultation'}
            </p>
        </div>

        <!-- Progress Steps -->
        <div class="max-w-4xl mx-auto mb-12">
            <div class="flex items-center justify-between">
                <div class="flex flex-col items-center flex-1">
                    <div id="step1-indicator" class="step active">1</div>
                    <span class="text-sm mt-2 font-medium">${lang === 'ar' ? 'التاريخ' : 'Date'}</span>
                </div>
                <div class="flex-1 h-1 bg-gray-200" id="line1"></div>
                <div class="flex flex-col items-center flex-1">
                    <div id="step2-indicator" class="step inactive">2</div>
                    <span class="text-sm mt-2">${lang === 'ar' ? 'الوقت' : 'Time'}</span>
                </div>
                <div class="flex-1 h-1 bg-gray-200" id="line2"></div>
                <div class="flex flex-col items-center flex-1">
                    <div id="step3-indicator" class="step inactive">3</div>
                    <span class="text-sm mt-2">${lang === 'ar' ? 'البيانات' : 'Details'}</span>
                </div>
                <div class="flex-1 h-1 bg-gray-200" id="line3"></div>
                <div class="flex flex-col items-center flex-1">
                    <div id="step4-indicator" class="step inactive">4</div>
                    <span class="text-sm mt-2">${lang === 'ar' ? 'التأكيد' : 'Confirm'}</span>
                </div>
            </div>
        </div>

        <!-- Booking Form Container -->
        <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <!-- Step 1: Date Selection -->
            <div id="step1" class="booking-step">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    ${lang === 'ar' ? 'اختر التاريخ المناسب' : 'Choose a Date'}
                </h2>
                
                <!-- Month Selector -->
                <div class="flex items-center justify-between mb-6">
                    <button onclick="previousMonth()" class="p-2 rounded-lg hover:bg-gray-100">
                        <i class="fas fa-chevron-${lang === 'ar' ? 'right' : 'left'} text-gray-600"></i>
                    </button>
                    <h3 id="currentMonth" class="text-xl font-semibold text-gray-700"></h3>
                    <button onclick="nextMonth()" class="p-2 rounded-lg hover:bg-gray-100">
                        <i class="fas fa-chevron-${lang === 'ar' ? 'left' : 'right'} text-gray-600"></i>
                    </button>
                </div>

                <!-- Calendar -->
                <div class="grid grid-cols-7 gap-2 mb-6">
                    <!-- Day headers -->
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'أح' : 'Sun'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'إث' : 'Mon'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'ثل' : 'Tue'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'أر' : 'Wed'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'خم' : 'Thu'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'جم' : 'Fri'}</div>
                    <div class="text-center font-semibold text-gray-600 py-2">${lang === 'ar' ? 'سب' : 'Sat'}</div>
                    <!-- Calendar days will be injected here -->
                    <div id="calendarDays" class="col-span-7 grid grid-cols-7 gap-2"></div>
                </div>

                <div class="text-sm text-gray-600 space-y-2">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded bg-blue-600"></div>
                        <span>${lang === 'ar' ? 'التاريخ المحدد' : 'Selected date'}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded border-2 border-blue-200 bg-white"></div>
                        <span>${lang === 'ar' ? 'متاح للحجز' : 'Available for booking'}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded bg-gray-100"></div>
                        <span>${lang === 'ar' ? 'غير متاح' : 'Not available'}</span>
                    </div>
                </div>
            </div>

            <!-- Step 2: Time Selection -->
            <div id="step2" class="booking-step hidden">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">
                    ${lang === 'ar' ? 'اختر الوقت المناسب' : 'Choose a Time'}
                </h2>
                <p class="text-gray-600 mb-6">
                    ${lang === 'ar' ? 'التاريخ المحدد:' : 'Selected date:'} <span id="selectedDateDisplay" class="font-semibold"></span>
                </p>

                <div id="loadingSlots" class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">${lang === 'ar' ? 'جاري تحميل الأوقات المتاحة...' : 'Loading available times...'}</p>
                </div>

                <div id="timeSlotsContainer" class="hidden">
                    <h3 class="font-semibold text-gray-700 mb-3">${lang === 'ar' ? 'الأوقات المتاحة:' : 'Available times:'}</h3>
                    <div id="timeSlots" class="grid grid-cols-3 md:grid-cols-5 gap-3"></div>
                </div>

                <div id="noSlotsMessage" class="hidden text-center py-12">
                    <i class="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600">${lang === 'ar' ? 'لا توجد أوقات متاحة في هذا التاريخ' : 'No available times for this date'}</p>
                </div>

                <div class="flex gap-4 mt-8">
                    <button onclick="goToStep(1)" class="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                        <i class="fas fa-arrow-${lang === 'ar' ? 'right' : 'left'} ${lang === 'ar' ? 'mr' : 'ml'}-2"></i>
                        ${lang === 'ar' ? 'السابق' : 'Previous'}
                    </button>
                </div>
            </div>

            <!-- Step 3: Patient Information -->
            <div id="step3" class="booking-step hidden">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    ${lang === 'ar' ? 'بياناتك الشخصية' : 'Your Information'}
                </h2>

                <form id="patientForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ${lang === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                        </label>
                        <input type="text" id="patientName" required
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="${lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ${lang === 'ar' ? 'رقم الجوال' : 'Phone Number'} *
                        </label>
                        <input type="tel" id="patientPhone" required
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="${lang === 'ar' ? '05xxxxxxxx' : '05xxxxxxxx'}">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ${lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                        </label>
                        <input type="email" id="patientEmail"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="${lang === 'ar' ? 'email@example.com' : 'email@example.com'}">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ${lang === 'ar' ? 'سبب الزيارة (مختصر)' : 'Reason for Visit (Brief)'}
                        </label>
                        <textarea id="patientReason" rows="3"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="${lang === 'ar' ? 'اذكر سبب الزيارة بشكل مختصر' : 'Brief description of your visit reason'}"></textarea>
                    </div>

                    <div class="flex items-start gap-3">
                        <input type="checkbox" id="consentPrivacy" required class="mt-1 w-5 h-5 text-blue-600">
                        <label for="consentPrivacy" class="text-sm text-gray-700">
                            ${lang === 'ar' 
                                ? 'أوافق على <a href="/privacy" class="text-blue-600 underline">سياسة الخصوصية</a> وشروط الاستخدام' 
                                : 'I agree to the <a href="/privacy" class="text-blue-600 underline">Privacy Policy</a> and Terms of Use'}
                        </label>
                    </div>
                </form>

                <div class="flex gap-4 mt-8">
                    <button onclick="goToStep(2)" class="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                        <i class="fas fa-arrow-${lang === 'ar' ? 'right' : 'left'} ${lang === 'ar' ? 'mr' : 'ml'}-2"></i>
                        ${lang === 'ar' ? 'السابق' : 'Previous'}
                    </button>
                    <button onclick="goToStep(4)" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                        ${lang === 'ar' ? 'التالي' : 'Next'}
                        <i class="fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} ${lang === 'ar' ? 'ml' : 'mr'}-2"></i>
                    </button>
                </div>
            </div>

            <!-- Step 4: Confirmation -->
            <div id="step4" class="booking-step hidden">
                <div id="confirmationView">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">
                        ${lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                    </h2>

                    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                        <h3 class="font-semibold text-gray-800 mb-4">${lang === 'ar' ? 'ملخص الحجز:' : 'Booking Summary:'}</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600">${lang === 'ar' ? 'التاريخ:' : 'Date:'}</span>
                                <span id="confirmDate" class="font-semibold"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">${lang === 'ar' ? 'الوقت:' : 'Time:'}</span>
                                <span id="confirmTime" class="font-semibold"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">${lang === 'ar' ? 'الاسم:' : 'Name:'}</span>
                                <span id="confirmName" class="font-semibold"></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">${lang === 'ar' ? 'الجوال:' : 'Phone:'}</span>
                                <span id="confirmPhone" class="font-semibold"></span>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button onclick="goToStep(3)" class="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                            <i class="fas fa-arrow-${lang === 'ar' ? 'right' : 'left'} ${lang === 'ar' ? 'mr' : 'ml'}-2"></i>
                            ${lang === 'ar' ? 'السابق' : 'Previous'}
                        </button>
                        <button onclick="submitBooking()" id="submitBtn" class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                            <i class="fas fa-check ${lang === 'ar' ? 'ml' : 'mr'}-2"></i>
                            ${lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>

                <!-- Success Message (hidden initially) -->
                <div id="successView" class="hidden text-center py-12">
                    <div class="mb-6">
                        <i class="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">
                            ${lang === 'ar' ? '✅ تم الحجز بنجاح!' : '✅ Booking Confirmed!'}
                        </h2>
                        <p class="text-gray-600">
                            ${lang === 'ar' ? 'رقم الحجز:' : 'Booking Number:'} <span id="bookingNumber" class="font-bold text-blue-600"></span>
                        </p>
                    </div>

                    <div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                        <p class="text-gray-700 mb-4">
                            ${lang === 'ar' 
                                ? '📧 تم إرسال تأكيد الحجز على جوالك/بريدك' 
                                : '📧 Confirmation sent to your phone/email'}
                        </p>
                        <p class="text-gray-700">
                            ${lang === 'ar' 
                                ? '💬 ستصلك رسالة تذكير قبل 24 ساعة من الموعد' 
                                : '💬 You will receive a reminder 24 hours before your appointment'}
                        </p>
                    </div>

                    <div class="flex gap-4 justify-center">
                        <a href="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                            <i class="fas fa-home ${lang === 'ar' ? 'ml' : 'mr'}-2"></i>
                            ${lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const lang = '${lang}';
        const isArabic = lang === 'ar';
        let currentDate = new Date();
        let selectedDate = null;
        let selectedTime = null;
        let availableDates = [];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadMonth();
        });

        function loadMonth() {
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const monthStr = \`\${year}-\${month}\`;

            // Update month display
            const monthNames = isArabic 
                ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
                : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.getElementById('currentMonth').textContent = \`\${monthNames[currentDate.getMonth()]} \${year}\`;

            // Fetch available dates
            fetch(\`/api/booking/available-dates?month=\${monthStr}\`)
                .then(res => res.json())
                .then(data => {
                    availableDates = data.data.dates;
                    renderCalendar();
                });
        }

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let html = '';
            
            // Empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                html += '<div></div>';
            }

            // Days of month
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = \`\${year}-\${String(month + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
                const date = new Date(year, month, day);
                const isAvailable = availableDates.includes(dateStr);
                const isPast = date < today;
                const isSelected = selectedDate === dateStr;

                let classes = 'calendar-day';
                if (isPast) classes += ' past';
                else if (!isAvailable) classes += ' disabled';
                else if (isSelected) classes += ' selected';
                else classes += ' available';

                html += \`<div class="\${classes}" onclick="selectDate('\${dateStr}', \${isAvailable && !isPast})">\${day}</div>\`;
            }

            document.getElementById('calendarDays').innerHTML = html;
        }

        function selectDate(dateStr, isAvailable) {
            if (!isAvailable) return;
            selectedDate = dateStr;
            renderCalendar();
            goToStep(2);
            loadTimeSlots(dateStr);
        }

        function loadTimeSlots(date) {
            document.getElementById('loadingSlots').classList.remove('hidden');
            document.getElementById('timeSlotsContainer').classList.add('hidden');
            document.getElementById('noSlotsMessage').classList.add('hidden');
            document.getElementById('selectedDateDisplay').textContent = formatDate(date);

            fetch(\`/api/booking/available-slots?date=\${date}\`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('loadingSlots').classList.add('hidden');
                    const slots = data.data.slots;
                    
                    if (slots.length === 0) {
                        document.getElementById('noSlotsMessage').classList.remove('hidden');
                    } else {
                        renderTimeSlots(slots);
                        document.getElementById('timeSlotsContainer').classList.remove('hidden');
                    }
                });
        }

        function renderTimeSlots(slots) {
            const html = slots.map(time => {
                const isSelected = selectedTime === time;
                return \`<div class="time-slot \${isSelected ? 'selected' : ''}" onclick="selectTime('\${time}')">\${formatTime(time)}</div>\`;
            }).join('');
            document.getElementById('timeSlots').innerHTML = html;
        }

        function selectTime(time) {
            selectedTime = time;
            const slots = document.querySelectorAll('.time-slot');
            slots.forEach(slot => slot.classList.remove('selected'));
            event.target.classList.add('selected');
            setTimeout(() => goToStep(3), 300);
        }

        function goToStep(step) {
            // Validation
            if (step === 2 && !selectedDate) {
                alert(isArabic ? 'الرجاء اختيار التاريخ أولاً' : 'Please select a date first');
                return;
            }
            if (step === 3 && !selectedTime) {
                alert(isArabic ? 'الرجاء اختيار الوقت أولاً' : 'Please select a time first');
                return;
            }
            if (step === 4) {
                if (!validateForm()) return;
                updateConfirmation();
            }

            // Hide all steps
            document.querySelectorAll('.booking-step').forEach(s => s.classList.add('hidden'));
            // Show current step
            document.getElementById(\`step\${step}\`).classList.remove('hidden');

            // Update progress indicators
            updateProgress(step);
        }

        function updateProgress(currentStep) {
            for (let i = 1; i <= 4; i++) {
                const indicator = document.getElementById(\`step\${i}-indicator\`);
                if (i < currentStep) {
                    indicator.className = 'step completed';
                } else if (i === currentStep) {
                    indicator.className = 'step active';
                } else {
                    indicator.className = 'step inactive';
                }
            }
        }

        function validateForm() {
            const name = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const consent = document.getElementById('consentPrivacy').checked;

            if (!name) {
                alert(isArabic ? 'الرجاء إدخال الاسم' : 'Please enter your name');
                return false;
            }
            if (!phone || !/^(05|5)[0-9]{8}$/.test(phone.replace(/[\\s\\-]/g, ''))) {
                alert(isArabic ? 'رقم الجوال غير صحيح' : 'Invalid phone number');
                return false;
            }
            if (!consent) {
                alert(isArabic ? 'يجب الموافقة على سياسة الخصوصية' : 'You must agree to the privacy policy');
                return false;
            }
            return true;
        }

        function updateConfirmation() {
            document.getElementById('confirmDate').textContent = formatDate(selectedDate);
            document.getElementById('confirmTime').textContent = formatTime(selectedTime);
            document.getElementById('confirmName').textContent = document.getElementById('patientName').value;
            document.getElementById('confirmPhone').textContent = document.getElementById('patientPhone').value;
        }

        async function submitBooking() {
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (isArabic ? 'جاري الحجز...' : 'Booking...');

            const bookingData = {
                patient_name: document.getElementById('patientName').value,
                patient_phone: document.getElementById('patientPhone').value,
                patient_email: document.getElementById('patientEmail').value || null,
                booking_date: selectedDate,
                booking_time: selectedTime,
                reason: document.getElementById('patientReason').value || null,
                consent_privacy: true
            };

            try {
                const response = await fetch('/api/booking/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('bookingNumber').textContent = result.data.booking_number;
                    document.getElementById('confirmationView').classList.add('hidden');
                    document.getElementById('successView').classList.remove('hidden');
                } else {
                    alert(result.error || (isArabic ? 'حدث خطأ في الحجز' : 'Booking failed'));
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-check mr-2"></i>' + (isArabic ? 'تأكيد الحجز' : 'Confirm Booking');
                }
            } catch (error) {
                alert(isArabic ? 'حدث خطأ في الاتصال' : 'Connection error');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check mr-2"></i>' + (isArabic ? 'تأكيد الحجز' : 'Confirm Booking');
            }
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            loadMonth();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            loadMonth();
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const monthNames = isArabic 
                ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
                : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return \`\${date.getDate()} \${monthNames[date.getMonth()]} \${date.getFullYear()}\`;
        }

        function formatTime(timeStr) {
            return timeStr;
        }
    </script>
    ${getFooter(lang)}
</body>
</html>
  `);
});

export default bookingPage;