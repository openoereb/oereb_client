FROM registry.gitlab.com/geo-bl-ch/docker/python:alpine-3.12

USER 0

RUN apk --update add \
        build-base \
        nodejs \
        npm \
        uwsgi-python3

ENV PATH="/app/.local/bin:${PATH}"

COPY --chown=1001:0 . /app

WORKDIR /app

EXPOSE 8080

USER 1001

RUN make build

CMD ["make", "serve"]
