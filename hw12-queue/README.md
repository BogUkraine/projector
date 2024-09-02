# Homework #11 for Projector course

Set up 3 containers: beanstalkd and redis (rdb and aof).
Write 2 simple scripts: 1st should put message into queue, 2nd should read from queue.
Configure storing to disk.
Сompare queues performance.

## Setup

1. `npm i`
2. `docker compose up`
3. `node src/..`

## Results

For the producer we take 10000 \* 1000 operations - 10.000.000

### Redis AOF

1. Consumer throughput - 1.000.000 / 1.6s = 625000 req/sec

```
pubsub: 1.636s
pubsub: 1.590s
pubsub: 1.589s
pubsub: 1.587s
pubsub: 1.605s
pubsub: 1.616s
pubsub: 1.644s
pubsub: 1.644s
pubsub: 1.627s
```

2. Producer throughput - 10.000.000 / 16s = 625000 req/sec

### Redis RDB

#### pub/sub

1. Consumer throughput - 1.000.000 / 1.65s = 606000 req/sec - slight performance degradation

```
pubsub: 1.652s
pubsub: 1.666s
pubsub: 1.650s
pubsub: 1.636s
pubsub: 1.690s
pubsub: 1.659s
pubsub: 1.646s
pubsub: 1.655s
pubsub: 1.647s
```

2. Producer throughput - 10.000.000 / 15.5s = 645.000 req/sec - slight improvement

#### lPush/lPop

1. Consumer throughput - 1.000.000 / 26.5s = 37735 req/sec - huge performance degradation. But it could be corrected if we took not a single job at a time, but did in in batches

2. Producer throughput - 10.000.000 / 15s = 667000 req/sec - slight improvement

### beanstalkd

1. Consumer throughput - 1.000.000 / 80s = 12500 req/sec
2. Producer throughput - 1.000.000 / 31s = 32258 req/sec
