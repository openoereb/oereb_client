FROM registry.gitlab.com/geo-bl-ch/docker/python:alpine-3.21

USER 0

RUN apk update && \
    apk upgrade && \
    apk --update add \
        zsh \
        bash \
        bash-completion \
        shadow \
        build-base \
        nodejs \
        npm \
        uwsgi-python3 \
        yq \
        python3-dev \
        libffi-dev \
        openssh

ENV PATH="/app/.local/bin:${PATH}" \
    DEVELOPMENT=true \
    LOG_LEVEL=debug \
    SHELL=/bin/zsh

EXPOSE 8080

RUN addgroup -g 1000 vscode && \
    adduser -h /home/vscode -s /bin/bash -G vscode -D -u 1000 vscode

USER 1000

RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

CMD ["make", "serve"]
