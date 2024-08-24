SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

USE test_db;
SET autocommit=0;

-- Transaction 1
START TRANSACTION;
UPDATE test_table SET value = 30 WHERE id = 1;

DO SLEEP(5); -- time to execute second transaction

ROLLBACK;