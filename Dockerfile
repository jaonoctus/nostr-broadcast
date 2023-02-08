FROM node:18.14.0

WORKDIR /opt/nostr-broadcast

COPY package.json package-lock.json ./
RUN npm ci

COPY entrypoint.sh tsup.config.ts ./
COPY src/ src/
RUN npm run build

ENTRYPOINT [ "sh", "entrypoint.sh" ]
