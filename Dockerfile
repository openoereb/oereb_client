FROM alpine:3.12

ENV CI=true \
    PATH="/app/.local/bin:${PATH}"

RUN adduser -D -S -h /app -s /sbin/nologin -G root --uid 1001 app && \
    apk --update add build-base python3 py3-pip nodejs npm openjdk11-jre

COPY --chown=1001:0 . /app

WORKDIR /app

EXPOSE 8080

USER 1001

RUN make install

CMD ["make", "serve"]
