CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value INT
) ENGINE=InnoDB;

INSERT INTO test_table (value) VALUES (10);

SET GLOBAL innodb_status_output=ON;
SET GLOBAL innodb_status_output_locks=ON;
