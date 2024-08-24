SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

USE test_db;
SET autocommit=0;

-- Transaction 1
START TRANSACTION;
SELECT value FROM test_table WHERE id = 1;  -- Assume value is 20

DO SLEEP(5); -- time to execute second transaction

SELECT value FROM test_table WHERE id = 1;  -- Now value is 40
COMMIT;
