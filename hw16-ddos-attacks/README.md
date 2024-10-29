# Homework #16 for Projector course
1. Setup two docker containers: 
* Attacker container
* there you need to write scripts that will implement 6 attacks (UDP Flood, ICMP flood, HTTP flood, Slowloris, SYN flood,  Ping of Death) 
* Defender container
* ubuntu & nginx with simple website.
2. Try to implement protection on Defender container.
3. Launch attacker scripts and examine you protection.

## Setup
1. Attacker container with ubuntu and the respective packages. Also, coppied `./scripts` with attacks.
2. Defender container with nginx config

## Results
### Http flood
`sudo docker exec -it attacker ./http-flood.sh`
```
{       "transactions":                           21,
        "availability":                         1.62,
        "elapsed_time":                         0.06,
        "data_transferred":                     0.24,
        "response_time":                        0.51,
        "transaction_rate":                   350.00,
        "throughput":                           3.99,
        "concurrency":                        177.67,
        "successful_transactions":                21,
        "failed_transactions":                  1273,
        "longest_transaction":                  0.02,
        "shortest_transaction":                 0.00
}
```
As we can see, 1273 transactions were denied as we added `limit_req_zone`

### ICMP flood
`sudo docker exec -it attacker ./icmp-flood.sh`
To block ICMP ping requests on OS system level.

### Ping of death
`sudo docker exec -it attacker ./ping-of-death.sh`
Doesn't work anymore

### Slowloris
`sudo docker exec -it attacker ./slowloris.sh`
```
root@4e8dd6dbfccc:/opt/attacks# cat slowloris.html.csv
Seconds,Closed,Pending,Connected,Service Available
0,0,1,0,1000
1,0,1,182,1000
2,0,1,362,1000
3,0,1,541,1000
4,0,1,719,1000
5,0,1,899,1000
6,0,0,1000,1000
7,0,0,1000,1000
8,0,0,1000,1000
9,0,0,1000,1000
10,1,0,999,1000
11,181,0,819,1000
12,361,0,639,1000
13,540,0,460,1000
14,718,0,282,1000
15,898,0,102,1000
```

mitigated with 
```
client_body_timeout 10s;
client_header_timeout 10s;
```

### Syn flood
`sudo docker exec -it attacker ./syn-flood.sh`

### UDP flood
`sudo docker exec -it attacker ./udp-flood.sh`