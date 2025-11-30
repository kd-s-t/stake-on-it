-- Insert test users (password: "password123")
INSERT INTO users (email, name, password, balance) VALUES 
('test@example.com', 'Test User', '$2a$12$5O6hujWjW/GNRtySXT0EhOwiPuxyXIp9OSxx8wQK3.oJmMWJ1TaA.', 1000.00),
('user2@example.com', 'User Two', '$2a$12$5O6hujWjW/GNRtySXT0EhOwiPuxyXIp9OSxx8wQK3.oJmMWJ1TaA.', 500.00)
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;