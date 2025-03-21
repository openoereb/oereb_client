FROM registry.gitlab.com/geo-bl-ch/docker/python:alpine-3.21 AS builder

USER 0

RUN apk update && \
    apk upgrade && \
    apk add \
        bash \
        bash-completion \
        shadow \
        build-base \
        nodejs \
        npm \
        uwsgi-python3 \
        python3-dev

COPY . /app

WORKDIR /app

RUN python3 -m venv .venv && \
    .venv/bin/pip install --upgrade pip && \
    .venv/bin/pip install wheel && \
    .venv/bin/pip install pyyaml && \
    .venv/bin/pip install -e . && \
    npm install --legacy-peer-deps && \
    ./node_modules/.bin/vite build

USER 1001

FROM registry.gitlab.com/geo-bl-ch/docker/python:alpine-3.21

USER 0

RUN apk update && \
    apk upgrade && \
    apk add \
        bash \
        uwsgi-python3

COPY --from=builder --chown=1001:0 /app/.venv /app/.venv
COPY --from=builder --chown=1001:0 /app/oereb_client/*.py /app/oereb_client/
COPY --from=builder --chown=1001:0 /app/oereb_client/templates /app/oereb_client/templates
COPY --from=builder --chown=1001:0 /app/oereb_client/views /app/oereb_client/views
COPY --from=builder --chown=1001:0 /app/oereb_client/static/i18n /app/oereb_client/static/i18n
COPY --from=builder --chown=1001:0 /app/oereb_client/static/images /app/oereb_client/static/images
COPY --from=builder --chown=1001:0 /app/oereb_client/static/build /app/oereb_client/static/build
COPY --from=builder --chown=1001:0 /app/oereb_client.egg-info /app/oereb_client.egg-info
COPY --from=builder --chown=1001:0 /app/app.ini /app/app.ini

ENV PATH="/app/.local/bin:${PATH}"

EXPOSE 8080

USER 1001

CMD ["uwsgi", "--plugin", "python3", "--http-socket", "0.0.0.0:8080", "--ini-paste-logged", "/app/app.ini"]
