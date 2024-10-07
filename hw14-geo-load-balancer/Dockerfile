FROM openresty/openresty:1.21.4.1-0-alpine

# Install necessary dependencies
RUN apk update && apk add --no-cache \
    git \
    wget \
    curl \
    build-base \
    libmaxminddb-dev \
    zlib-dev \
    pcre-dev

# Set the working directory
WORKDIR /usr/local/src

# Download ngx_http_geoip2_module
RUN git clone https://github.com/leev/ngx_http_geoip2_module.git

# Download and extract Nginx source code (to compile GeoIP2 module)
RUN wget http://nginx.org/download/nginx-1.21.4.tar.gz \
    && tar zxvf nginx-1.21.4.tar.gz

# Build Nginx with ngx_http_geoip2_module
WORKDIR /usr/local/src/nginx-1.21.4
RUN ./configure --with-compat --add-dynamic-module=/usr/local/src/ngx_http_geoip2_module \
    && make modules \
    && cp objs/ngx_http_geoip2_module.so /usr/local/openresty/nginx/modules/

# Install lua-resty-upstream-healthcheck
RUN git clone https://github.com/openresty/lua-resty-upstream-healthcheck.git /usr/local/openresty/lualib/resty/upstream/healthcheck

# Create the GeoIP2 database directory
RUN mkdir -p /etc/nginx/geoip

# Copy the GeoLite2 database into the container from the build context
COPY GeoLite2-Country.mmdb /etc/nginx/geoip/GeoLite2-Country.mmdb

# Copy your custom nginx.conf file
COPY nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

# Expose Nginx port
EXPOSE 80

# Run Nginx in the foreground
CMD ["openresty", "-g", "daemon off;"]