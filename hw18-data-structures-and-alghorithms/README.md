# Homework #18 for Projector course

Implement class for Balanced Binary Search Tree that can insert, find and delete elements.<br />
Generate 100 random datasets and measure complexity.<br />
Implement Counting Sort algorithm.<br />
Figure out when Counting Sort doesn’t perform. <br />

## Results
![alt text](<Screenshot from 2024-09-29 21-53-25.png>)
Cannot extrapolate this data, as the noise is quite big. Random values and random find node value alongside random delete node make it unpredictable. It would be possible to predict something in case of bigger data samples, but then call stack is exceeded.
![alt text](<Screenshot from 2024-09-29 21-53-47.png>)

<br />
<br />
As for counting sort: it will not have any sense in case of huge boundaries of values. In case there are 5 values and the biggest one is 10^10 -> we will need to build an array of 10^10 size, which is quite unefficient.