SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

USE test_db;
SET autocommit=0;

-- Transaction 1
START TRANSACTION;
SELECT value FROM test_table WHERE id = 1;  -- Assume value is 10

DO SLEEP(5); -- time to execute second transaction

UPDATE test_table as t1
JOIN (
    SELECT value FROM test_table WHERE id = 1
) AS t2 ON t1.id = 1
SET t1.value = t2.value - 10; -- Overwrites value with 10 - 5 = 5

SELECT value FROM test_table WHERE id = 1;
COMMIT;
