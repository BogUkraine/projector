SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

USE test_db;
SET autocommit=0;

-- Transaction 2
START TRANSACTION;
SELECT value FROM test_table WHERE id = 1;  -- Reads value = 30
COMMIT;
