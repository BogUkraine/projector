CREATE DATABASE test_db;
USE test_db;

CREATE TABLE test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    a VARCHAR(255) NOT NULL,
    b INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test (a, b) VALUES 
('A', 1),
('B', 2),
('C', 3),
('D', 4),
('E', 5);