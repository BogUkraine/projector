# Homework #11 for Projector course

Build master-slave redis cluster.
Try all eviction strategies.
Write a wrapper for Redis Client that implement probabilistic cache.

## Setup

1. `npm i`
2. `docker compose up`
3. `npm run start`
4. (optional) `bash ./siege/test.sh` to run siege

## Results

There was implemented probabilistic cache and its optimization

### Probabilistic

1. if probability is less than random num -> go to DB and set the value to Redis
2. if probability is greater than random num from 0 to 1 -> try to get value and ttl
3. if there is no value -> go to DB and set the value to Redis
4. if ttl < 60 seconds -> lower the threshold
5. return a value

### Optimized

1. to check if it is the third retry. If so, we suppose the thread that was in charge of updating the value has failed, but set the lock in Redis for the key. Setting it again.
2. get value. Return.
3. if there is no value -> check lock on Redis side
4. if there is a lock -> retry after 50 ms delay 3 times
5. if there is no lock -> set lock and set the value
