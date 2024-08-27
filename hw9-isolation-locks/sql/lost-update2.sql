SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

USE test_db;
SET autocommit=0;

START TRANSACTION;

SELECT * FROM test_table as t1 WHERE t1.id = 1;

UPDATE test_table as t1
SET t1.value = t1.value + 10
WHERE t1.id = 1;

SELECT * FROM test_table as t1 WHERE t1.id = 1;

ROLLBACK;
