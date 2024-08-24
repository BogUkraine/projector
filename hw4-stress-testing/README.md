Homework 1.5 for Projector Highload Software Architecture course
## How to run the app
1. Copy `.env.example` to `.env`
2. docker-compose up
3. `npm run start:dev`
4. install `siege`

## Test cases for siege
`bash ./siege/test_c_10.sh`
```
{       
    "transactions":                        20000,
    "availability":                       100.00,
    "elapsed_time":                        13.68,
    "data_transferred":                     1.67,
    "response_time":                        0.00,
    "transaction_rate":                  1461.99,
    "throughput":                           0.12,
    "concurrency":                          2.41,
    "successful_transactions":             15021,
    "failed_transactions":                     0,
    "longest_transaction":                  0.02,
    "shortest_transaction":                 0.00
}
```

`bash ./siege/test_c_25.sh`
```
{      
    "transactions":                        50000,
    "availability":                       100.00,
    "elapsed_time":                        22.87,
    "data_transferred":                     4.17,
    "response_time":                        0.01,
    "transaction_rate":                  2186.27,
    "throughput":                           0.18,
    "concurrency":                         13.67,
    "successful_transactions":             37534,
    "failed_transactions":                     0,
    "longest_transaction":                  0.03,
    "shortest_transaction":                 0.00
}
```

`bash ./siege/test_c_50.sh`
```
{       
    "transactions":                        50000,
    "availability":                       100.00,
    "elapsed_time":                        23.94,
    "data_transferred":                     4.18,
    "response_time":                        0.02,
    "transaction_rate":                  2088.55,
    "throughput":                           0.17,
    "concurrency":                         39.10,
    "successful_transactions":             37479,
    "failed_transactions":                     0,
    "longest_transaction":                  0.07,
    "shortest_transaction":                 0.00
}
```

`bash ./siege/test_c_100.sh`
```
{       
    "transactions":                        50000,
    "availability":                       100.00,
    "elapsed_time":                        22.72,
    "data_transferred":                     4.21,
    "response_time":                        0.05,
    "transaction_rate":                  2200.70,
    "throughput":                           0.19,
    "concurrency":                         99.64,
    "successful_transactions":             37524,
    "failed_transactions":                     0,
    "longest_transaction":                  0.13,
    "shortest_transaction":                 0.00
}
```

`bash ./siege/test_c_200.sh`
```
{      
    "transactions":                        60000,
    "availability":                       100.00,
    "elapsed_time":                        27.79,
    "data_transferred":                     5.05,
    "response_time":                        0.09,
    "transaction_rate":                  2159.05,
    "throughput":                           0.18,
    "concurrency":                        199.48,
    "successful_transactions":             45088,
    "failed_transactions":                     0,
    "longest_transaction":                  0.21,
    "shortest_transaction":                 0.01
}
```

`bash ./siege/test_c_400.sh`
```
{       
    "transactions":                        60000,
    "availability":                       100.00,
    "elapsed_time":                        27.50,
    "data_transferred":                     5.05,
    "response_time":                        0.18,
    "transaction_rate":                  2181.82,
    "throughput":                           0.18,
    "concurrency":                        398.18,
    "successful_transactions":             45006,
    "failed_transactions":                     0,
    "longest_transaction":                  0.36,
    "shortest_transaction":                 0.01
}
```

`bash ./siege/test_c_800.sh`
```
{       
    "transactions":                        40000,
    "availability":                       100.00,
    "elapsed_time":                        20.79,
    "data_transferred":                     3.37,
    "response_time":                        0.32,
    "transaction_rate":                  1924.00,
    "throughput":                           0.16,
    "concurrency":                        613.86,
    "successful_transactions":             30026,
    "failed_transactions":                     0,
    "longest_transaction":                 19.44,
    "shortest_transaction":                 0.01
}
```

`bash ./siege/test_c_1000.sh`
```
{       
    "transactions":                        50000,
    "availability":                       100.00,
    "elapsed_time":                        29.28,
    "data_transferred":                     4.21,
    "response_time":                        0.35,
    "transaction_rate":                  1707.65,
    "throughput":                           0.14,
    "concurrency":                        604.32,
    "successful_transactions":             37477,
    "failed_transactions":                     0,
    "longest_transaction":                 27.66,
    "shortest_transaction":                 0.03
}
```

## Conclusion
The idea was to overload the system with enormous concurrency level as for single webserver on a single machine. However, the biggest number of concurrency was 1000. If the number is higher, siege just stops responding and freezes the terminal. The capabilities of simultaneous connections were exhausted after ubuntu configuration files changed to the maximum level.
</br>
As we can see, the server started slowing down only with **800 concurrency**. The longest transaction took 19 seconds to be processed comparing it to 400 concurrency, where it was 0.36. Also, transaction rate metric has decreased with such load. But in general the system was up and running.
</br>
A simple Node.js server survived, siege did not.