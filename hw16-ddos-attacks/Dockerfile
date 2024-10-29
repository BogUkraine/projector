FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    hping3 \
    slowhttptest \
    siege \
    iputils-ping

COPY ./scripts /opt/attacks

WORKDIR /opt/attacks

RUN chmod +x *.sh

CMD ["tail", "-f", "/dev/null"]