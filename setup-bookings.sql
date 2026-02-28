-- إضافة مواعيد العمل الأسبوعية
-- السبت - الخميس: 4:00 PM - 10:00 PM
-- الجمعة: مغلق

-- السبت (day_of_week = 6)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (6, '16:00', '22:00', 30, 3, 1);

-- الأحد (day_of_week = 0)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (0, '16:00', '22:00', 30, 3, 1);

-- الاثنين (day_of_week = 1)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (1, '16:00', '22:00', 30, 3, 1);

-- الثلاثاء (day_of_week = 2)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (2, '16:00', '22:00', 30, 3, 1);

-- الأربعاء (day_of_week = 3)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (3, '16:00', '22:00', 30, 3, 1);

-- الخميس (day_of_week = 4)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (4, '16:00', '22:00', 30, 3, 1);

-- الجمعة (day_of_week = 5) - مغلق (is_active = 0)
INSERT INTO booking_slots (day_of_week, start_time, end_time, slot_duration, max_bookings_per_slot, is_active)
VALUES (5, '16:00', '22:00', 30, 0, 0);
