
FROM nginx:1.25.1

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    zlib1g \
    zlib1g-dev \
    libssl-dev \
    wget \
    git \
    curl

# Download ngx_cache_purge module
RUN cd /usr/local/src && \
    git clone https://github.com/FRiCKLE/ngx_cache_purge.git

# Build NGINX with ngx_cache_purge module
RUN cd /usr/local/src/nginx-${NGINX_VERSION} && \
    ./configure --add-module=/usr/local/src/ngx_cache_purge && \
    make && \
    make install

# # Copy the custom NGINX configuration file
# COPY nginx.conf /usr/local/nginx/conf/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]