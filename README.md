# nostr-rebroadcast

This tool allows you to take events from one relay and publish them to another

## Pre-requisites

You must have Node.js (>=18) and npm installed or Docker.

## Build

```
git clone https://github.com/leesalminen/nostr-rebroadcast.git
cd nostr-rebroadcast
npm install
npm run build
```

## Usage

```
Usage: nostr-rebroadcast [options]

Options:
  -v, --version  output the version number
  --pk <pk>      Nostr public key (hex or npub)
  --to <to>      Nostr relay URL to send events (e.g. "wws://destination.nostr.relay")
  --from <from>  Nostr relay URL to fetch events (comma-separated, e.g. "wss://origin1.nostr.relay,wss://origin2.nostr.relay")
  -h, --help     display help for command
```

### Example

```
node dist/index.cjs --pk "YOUR_PUBLIC_KEY" --to "wws://destination.nostr.relay" --from "wss://origin1.nostr.relay,wss://origin2.nostr.relay"
```


### Docker

```
docker run --rm -it jaonoctus/nostr-rebroadcast --pk "YOUR_PUBLIC_KEY" --to "wws://destination.nostr.relay" --from "wss://origin1.nostr.relay,wss://origin2.nostr.relay"
```
