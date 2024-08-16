# Homework #7 for Projector course
Make a table for 40M users.
<br/>
Compare performance of selections by date of birth: 
* Without index 
* With BTREE index
* With HASH index 
<br/>
Check insert speed difference with different innodb_flush_log_at_trx_commit value and different ops per second.

## How to start
1. run `docker compose --env-file .env up`
2. copy `.env.example` > `.env` 
3. `node src/init.js` - to create a table
4. `node src/insert-data.js` - to insert data to users table in batches (batch size and number is controler from `.env`)
5. `node src/get-data.js` - to fetch the data
6. `node src/set-index.js` - to create/drop an index (operation type is controller by `.env` variable)

## Results
There is a table with ~40.000.000 records.

| Operation       | No indexes  | BTREE               | HASH                 |
| --------------- | ----------- | ------------------- | -------------------- |
| SELECT username | 9.188s      | 9.194s              | 9.066s               |
| SELECT dob =    | 9.666s      | 1.53ms              | 1.541ms              |
| SELECT dob >    | 7.75ms      | 8.536ms             | 15.244ms             |
| SELECT dob <    | 13.634ms    | 8.151ms             | 6.115ms              |
| INSERT 100*100  | 416.795ms   | 2.036s              | 1.399s               |
| SORT by dob     | 12s         | 6ms                 | 7ms                  |
| CREATE INDEX    | -           | 1:20.931 (m:ss.mmm) | 1:05.161 (m:ss.mmm)  |
| DROP INDEX      | -           | 45.397ms            | 44.316ms             |

### innodb_flush_log_at_trx_commit

| innodb_flush_log_at_trx_commit | No indexes  | BTREE               | HASH                 |
| ------------------------------ | ----------- | ------------------- | -------------------- |
| 0 - insert 10 * 100            | 9.188s      | 9.194s              | 9.066s               |
| 0 - insert 100 * 100           | 9.188s      | 9.194s              | 9.066s               |
| 0 - insert 1000 * 100          | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 10 * 100            | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 100 * 100           | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 1000 * 100          | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 10 * 100            | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 100 * 100           | 9.188s      | 9.194s              | 9.066s               |
| 1 - insert 1000 * 100          | 9.188s      | 9.194s              | 9.066s               |

## Consclusions
As we can see, select queries are running much faster with indexes. At the same time inserts are slowed down from 0.4s to 1.4s and 2s accordingly. That's a opposite side of coin to rebuild and index at every insert.
<br/>
Select `username` was added as a reference value and indexes didn't affect the queries execution time.