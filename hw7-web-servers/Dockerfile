
FROM nginx:alpine AS builder

ENV NGINX_VERSION=1.27.0
ENV CACHE_PURGE_VERSION=2.5.3

# Download sources
RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz && \
  wget "https://github.com/nginx-modules/ngx_cache_purge/archive/${CACHE_PURGE_VERSION}.tar.gz" -O ngx_cache_purge.tar.gz

  
# Install dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    libc-dev \
    make \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg

# Build NGINX with the ngx_cache_purge module
RUN mkdir -p /usr/src && \
    CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p' | sed 's/--with-cc-opt=.*//') && \
    tar -zxC /usr/src -f nginx.tar.gz && \
    tar -xzC /usr/src -f ngx_cache_purge.tar.gz && \
    cd /usr/src/nginx-$NGINX_VERSION && \
    ./configure $CONFARGS --add-dynamic-module=/usr/src/ngx_cache_purge-${CACHE_PURGE_VERSION} --with-compat && \
    make modules

FROM nginx:alpine

COPY --from=builder /usr/src/nginx-1.27.0/objs/ngx_http_cache_purge_module.so /etc/nginx/modules/ngx_cache_purge_module.so

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]