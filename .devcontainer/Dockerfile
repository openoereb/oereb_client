FROM registry.gitlab.com/geo-bl-ch/docker/python:alpine-3.14

USER 0

RUN apk --update add \
        bash \
        bash-completion \
        shadow \
        build-base \
        nodejs \
        npm \
        uwsgi-python3

ENV PATH="/app/.local/bin:${PATH}"

EXPOSE 8080

RUN addgroup -g 1000 vscode && \
    adduser -h /home/vscode -s /bin/bash -G vscode -D -u 1000 vscode

USER 1000

CMD ["make", "serve"]
