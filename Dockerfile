ARG \
    port_default=8084

# stage build
FROM\
    node:lts-bookworm-slim AS build

ENV \
    NODE_ENV=development \
    TMP_WORK_DIR=/opt/app

RUN apt-get update && apt-get upgrade -y

WORKDIR \
    $TMP_WORK_DIR

COPY \
    . \
    .

RUN \
    --mount=type=secret,mode=0644,id=npmrc,target=$TMP_WORK_DIR/.npmrc \
    npm install

RUN \
    npx eslint .

RUN \
    npx tsc --build

# stage production
FROM \
    node:lts-bookworm-slim AS production

ARG \
    port_default

ENV \
    NODE_ENV=production \
    PORT=${port_default} \
    TMP_BUILD_STAGE_WORK_DIR=/opt/app \
    TMP_USER=node

USER \
    $TMP_USER

RUN \
    mkdir \
    /home/$TMP_USER/app

WORKDIR \
    /home/$TMP_USER/app

COPY \
    --chown=$TMP_USER:$TMP_USER \
    package*.json \
    .

COPY \
    --from=build \
    --chown=$TMP_USER:$TMP_USER \
    $TMP_BUILD_STAGE_WORK_DIR/dist \
    .

RUN \
    --mount=type=secret,mode=0644,id=npmrc,target=/home/$TMP_USER/app/.npmrc \
    npm ci \
        --omit dev

EXPOSE \
    $PORT

CMD ["node", "index.js"]