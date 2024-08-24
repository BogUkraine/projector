# Homework #9 for Projector course
Set up percona and postgre and create an InnoDB table.
By changing isolation levels and making parallel queries, reproduce the main problems of parallel access:
1. lost update
2. dirty read
3. non-repeatable read
4. phantom read

## Isolation levels
1. Read Uncommitted - can see data written by uncommited transaction.
2. Read Committed - can see data written by commited transaction.
3. Repeatable Read - same read query always returns same result.
4. Serializable - can achieve same result if execute transactions serially in some order (FIFO).

## Setup
1. `docker compose up`
2. `cat ./sql/setup.sql | docker exec -i hw9-postgres psql -U user -d test_db`

## Results
### Dirty read
*Isolation Level: READ UNCOMMITTED.*<br />
Occurs when a transaction reads uncommitted changes made by another transaction.<br /><br />
The second command should be called from a different terminal within 5 seconds after the first command was called.
1. `cat /sql/dirty-read1.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to update a value. Sleeps 5 seconds and rolls back the changes;
2. `cat /sql/dirty-read2.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to read a value. Returns an updated value and commits the result of select;

### Phantom read
*Isolation Level: READ COMMITTED.*<br />
Occurs when a transaction reads a set of rows that match a condition, but another transaction inserts or deletes rows that affect the result set.<br /><br />
The second command should be called from a different terminal within 5 seconds after the first command was called.
1. `cat /sql/phantom-read1.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to perform a select. Sleeps 5 seconds. Performs the same select, that returns different value for the same query, because second transaction made an insert;
2. `cat /sql/phantom-read2.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to insert a value;
```
id      value
1       20
id      value
1       20
9       50
```

### Non-repeatable read
*Isolation Level: READ COMMITTED.*<br />
Occurs when a transaction reads the same row twice and finds different data because another transaction has modified it in between.<br /><br />
The second command should be called from a different terminal within 5 seconds after the first command was called.
1. `cat /sql/non-repeatable-read1.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to perform a select. Sleeps 5 seconds. Performs the same select, that returns different value for the same query, because second transaction made an update;
2. `cat /sql/non-repeatable-read2.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to update a value;
```
value
20
value
40
```

### Lost update -- in progress
*Isolation Level: REPEATABLE READ.*<br />
Occurs when two transactions read the same data and then update it based on the value read, leading to one update being "lost".<br /><br />
The second command should be called from a different terminal within 5 seconds after the first command was called.
1. `cat /sql/lost-update1.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to perform a select. Sleeps 5 seconds. Performs an update taking the last value we selected. The value will be changed despite the fact the second transaction already made an update. The result of the second transaction wasn't taken into account.
2. `cat /sql/lost-update2.sql | docker exec -i hw9-postgres psql -U user -d test_db` - Creates a transaction to update a value;
