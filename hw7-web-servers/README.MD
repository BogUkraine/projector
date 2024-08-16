# Homework #7 for Projector course
Configure nginx that will cache only images, that were requested at least twice.
<br/>
Add ability to drop nginx cache by request. 
<br/>
You should drop cache for specific file only (not all cache).

## How to start
1. run `docker compose up`

## Results
### Cache
`curl -I localhost:8080/sad.jpg`
```
HTTP/1.1 200 OK
Server: nginx/1.27.0
Date: Fri, 16 Aug 2024 13:33:24 GMT
Content-Type: image/jpeg
Content-Length: 42495
Connection: keep-alive
Last-Modified: Tue, 13 Aug 2024 18:02:28 GMT
ETag: "66bb9fb4-a5ff"
X-Cache-Status: MISS
Accept-Ranges: bytes
```
Make the request again
<br/>
`curl -I localhost:8080/sad.jpg`
```
HTTP/1.1 200 OK
Server: nginx/1.27.0
Date: Fri, 16 Aug 2024 13:37:04 GMT
Content-Type: image/jpeg
Content-Length: 42495
Connection: keep-alive
Last-Modified: Tue, 13 Aug 2024 18:02:28 GMT
ETag: "66bb9fb4-a5ff"
X-Cache-Status: HIT
Accept-Ranges: bytes
```
As we can see, X-Cache-Status changed from MISS to HIT.

### Purge
`curl -I localhost:8080/purge/sad.jpg`
```
HTTP/1.1 200 OK
Server: nginx/1.27.0
Date: Fri, 16 Aug 2024 13:38:31 GMT
Content-Type: text/html
Content-Length: 149
Connection: keep-alive
test: /sad.jpg
```
If we make a request to get an image again, it will have MISS value for the respective header. The cache will be purged for `sad.jpg` picture only.