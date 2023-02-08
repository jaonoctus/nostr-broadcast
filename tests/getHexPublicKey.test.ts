import { describe, expect, it } from 'vitest'
import { getHexPublicKey } from '../src/utils'

const HEX_PUBLIC_KEY = 'ed6b4c4479c2a9a74dc2fb0757163e25dc0a4e13407263952bfc6c56525f5cfd'
const NPUB = 'npub1a445c3rec256wnwzlvr4w937yhwq5nsngpex89ftl3k9v5jltn7sx79usx'

describe('getHexPublicKey', () => {
  it('should return the hex if hex is provided', () => {
    const pk = getHexPublicKey(HEX_PUBLIC_KEY)
    expect(pk).toBe(HEX_PUBLIC_KEY)
  })

  it('should return the hex if npub is provided', () => {
    const pk = getHexPublicKey(NPUB)
    expect(pk).toBe(HEX_PUBLIC_KEY)
  })

  it ('should throw an error if an invalid public key is provided', () => {
    expect(() => getHexPublicKey('notapublickey'))
      .toThrowErrorMatchingInlineSnapshot('"invalid public key"')
  })
})
