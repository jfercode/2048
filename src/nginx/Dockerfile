FROM alpine:3.19

RUN apk update && apk add --no-cache nginx openssl

RUN mkdir -p /run/nginx

COPY src/nginx/tools/entrypoint.sh /entrypoint.sh
COPY src/nginx/tools/default.conf /etc/nginx/http.d/default.conf


RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/entrypoint.sh" ]