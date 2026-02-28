-- Add admin user for media uploads
-- This migration ensures we have a valid user for foreign key constraints
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role, status) 
VALUES (1, 'admin@doctor-surgeon.com', 'dummy_hash', 'Admin User', 'admin', 'active');
