import 'websocket-polyfill'
import type { Event } from 'nostr-tools'
import process from 'node:process'
import {
  getHexPublicKey,
  defaultRelayFromUrls,
  commaSeparatedList,
  connect,
  websocketPrefix
} from './utils'
import { program } from 'commander'
import { name, version } from '../package.json'

type ProgramOptions = { pk: string, to: string, from?: string[] }

program
  .name(name)
  .version(version, '-v, --version')
  .requiredOption('--pk <pk>', 'Nostr public key (hex or npub)', getHexPublicKey)
  .requiredOption('--to <to>', 'Nostr relay URL to send events (e.g. "wws://destination.nostr.relay")', websocketPrefix)
  .option('--from <from>', 'Nostr relay URL to fetch events (comma-separated, e.g. "wss://origin1.nostr.relay,wss://origin2.nostr.relay")', commaSeparatedList)

program.parse()

const opts = program.opts<ProgramOptions>()

async function main() {
  const eventsReceived: string[] = []

  const relayFromUrls = Array.isArray(opts.from) && opts.from.length > 0
    ? opts.from
    : defaultRelayFromUrls

  relayFromUrls.forEach(async (relayUrl) => {
    const { relay: relayFrom } = await connect({ relayUrl })
    const { relay: relayTo } = await connect({ relayUrl: opts.to, exitIfFail: true })

    const eventsToMove: Event[] = []

    relayFrom.on('connect', () => {
      console.log(`connected to ${relayFrom.url}`)
    })

    relayTo.on('connect', () => {
      console.log(`connected to ${relayTo.url}`)
    })

    const sub = relayFrom.sub([
      {
        authors: [opts.pk],
      }
    ])
    sub.on('event', (event: Event) => {
      if (!event.id) return
      if(eventsReceived.indexOf(event.id) === -1) {
        eventsToMove.push(event)
        eventsReceived.push(event.id)
      }
    })
    sub.on('eose', async () => {
      sub.unsub()

      console.log(`got ${eventsToMove.length} events from ${relayFrom.url}`)

      eventsToMove.forEach(async (event, index) => {
        const pub = relayTo.publish(event)
        pub.on('ok', async () => {
          console.log(`${relayTo.url} has accepted our event from ${relayFrom.url} on ${new Date(event.created_at * 1000).toISOString()} of kind ${event.kind} and ID ${event.id}`)

          if(index == eventsToMove.length - 1) {
            console.log(`done with ${relayFrom.url}`)
            await relayFrom.close()
            await relayTo.close()
          }
        })
      })
    })
  })
}

main()
