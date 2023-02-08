import { nip19, relayInit } from 'nostr-tools'

export const defaultRelayFromUrls = [
  'wss://no.str.cr',
  'wss://paid.no.str.cr',
  'wss://nostr.fly.dev',
  'wss://relay.snort.social',
  'wss://relay.realsearch.cc',
  'wss://relay.nostrgraph.net',
  'wss://relay.minds.com/nostr/v1/ws',
  'wss://nos.lol',
  'wss://relay.current.fyi',
  'wss://puravida.nostr.land',
  'wss://nostr.milou.lol',
  'wss://eden.nostr.land',
  'wss://relay.damus.io',
  'wss://nostr.oxtr.dev'
]

export function websocketPrefix(value: string) {
  if (value.startsWith('ws://') || value.startsWith('wss://')) {
    return value
  }
  return `wss://${value}`
}

export function commaSeparatedList(value: string) {
  return value.split(',').map(websocketPrefix)
}

export function getHexPublicKey(publicKeyText: string) {
  if (publicKeyText.match(/[a-f0-9]{64}/)) {
    return publicKeyText
  }
  try {
    return `${nip19.decode(publicKeyText).data}`
  } catch (error) {
    console.error(`invalid public key: ${publicKeyText}`)
    process.exit(1)
  }
}


export async function connect({ relayUrl, exitIfFail = false }: { relayUrl: string, exitIfFail?: boolean }) {
  const relay = relayInit(relayUrl)

  try {
    await relay.connect()
  } catch (error) {
    console.error(`could not establish connection with this relay: "${relayUrl}"`)
    if (exitIfFail) {
      process.exit(1)
    }

  }

  return { relay }
}
