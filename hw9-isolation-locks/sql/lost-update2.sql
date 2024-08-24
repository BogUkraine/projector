SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

USE test_db;
SET autocommit=0;

-- Transaction 2
START TRANSACTION;
SELECT value FROM test_table WHERE id = 1;  -- Assume value is still 10

UPDATE test_table as t1
JOIN (
    SELECT value FROM test_table WHERE id = 1
) AS t2 ON t1.id = 1
SET t1.value = t2.value + 10;  -- New value is 20

SELECT value FROM test_table WHERE id = 1;
COMMIT;
