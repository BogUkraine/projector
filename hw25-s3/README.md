# Homework #25 for Projector course
Create bucket where objects can’t be modified and all requests are logged.

## Setup
There was S3 bucket created with
1. Object lock and retention in Compliance mode ![alt text](image.png)
2. Enabled server access logging for another bucket ![alt text](image-4.png)
3. When I try to upload an item with the same name, it will create a version istead of replacing the item ![alt text](image-2.png)
4. Logs example: ![alt text](image-3.png)