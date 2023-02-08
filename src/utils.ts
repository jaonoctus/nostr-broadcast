import { nip19 } from 'nostr-tools'
export function getHexPublicKey (publicKeyText: string) {
  if (publicKeyText.match(/[a-f0-9]{64}/)) {
    return publicKeyText
  }
  try {
    return `${nip19.decode(publicKeyText).data}`
  } catch (error) {
    throw new Error(`invalid public key`)
  }
}
