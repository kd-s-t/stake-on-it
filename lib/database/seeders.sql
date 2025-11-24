-- Insert test users (password: "password123")
INSERT INTO users (email, name, password, balance) VALUES 
('test@example.com', 'Test User', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 1000.00),
('user2@example.com', 'User Two', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 500.00)
ON CONFLICT (email) DO NOTHING;