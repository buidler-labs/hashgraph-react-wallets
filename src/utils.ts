import { AccountId, ContractId, TokenId } from '@hashgraph/sdk'
import { Chain, hexToBytes } from 'viem'
import { HederaNetwork } from './types'
import { HederaNetworks } from './constants'

export function getChainById(chains: Chain[], chainId: number): Chain | null {
  return chains.find((chain) => chain.id === chainId) ?? null
}

export function chainToNetworkName(chain: Chain): HederaNetwork {
  return HederaNetworks[chain.id]
}

export function toEvmAddress(value: AccountId | TokenId | ContractId): `0x${string}` {
  return `0x${value.toSolidityAddress()}`
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function compressPublicKey(uncompressedPublicKeyHex: `0x${string}`) {
  const publicKeyBytes = hexToBytes(uncompressedPublicKeyHex)

  if (publicKeyBytes.length !== 65 || publicKeyBytes[0] !== 0x04) {
    throw new Error('Invalid public key format. Expected uncompressed secp256k1 key (65 bytes, starting with 0x04).')
  }

  // Extract X and Y coordinates (remove the 0x04 prefix)
  const x = publicKeyBytes.slice(1, 33)
  const y = publicKeyBytes.slice(33, 65)

  // Compute compressed key prefix: 0x02 if Y is even, 0x03 if Y is odd
  const prefix = y[y.length - 1] % 2 === 0 ? 0x02 : 0x03

  return new Uint8Array([prefix, ...x])
}
