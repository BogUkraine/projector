SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

USE test_db;
SET autocommit=0;

-- Transaction 1
START TRANSACTION;
SELECT * FROM test_table WHERE value > 10;  -- Assume returns 1 row

DO SLEEP(5); -- time to execute second transaction

SELECT * FROM test_table WHERE value > 10;  -- Now returns 2 rows
COMMIT;
