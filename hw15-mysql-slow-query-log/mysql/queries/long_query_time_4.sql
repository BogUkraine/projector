USE test_db;

SET GLOBAL long_query_time = 4;
SELECT * FROM test;
SELECT SLEEP(1);
SELECT SLEEP(2);
SELECT SLEEP(3);
SELECT SLEEP(5);