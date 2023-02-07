FROM node:18.14.0

WORKDIR /opt/nostr-broadcast

COPY package.json package-lock.json ./
RUN npm ci

COPY index.js entrypoint.sh ./

ENTRYPOINT [ "sh", "entrypoint.sh" ]
