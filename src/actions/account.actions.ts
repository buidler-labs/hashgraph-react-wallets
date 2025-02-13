import { Config } from 'wagmi'
import { getAccount as wagmi_getAccount, getBalance as wagmi_getBalance } from 'wagmi/actions'
import { HWBridgeSession } from '../hWBridge'
import { UserBalanceResult } from '../types'
import {
  ConnectorType,
  DEFAULT_TOKEN_DECIMALS,
  DEFAULT_TOKEN_DECIMALS_ETHEREUM,
  DEFAULT_TOKEN_SYMBOL,
} from '../constants'
import { queryMirror } from './mirror.actions'
import { MirrorBalancesResponse } from './types'
import { HederaSignerType } from '../hWBridge/types'
import { chainToNetworkName, compressPublicKey } from '../utils'
import { AccountId, PublicKey, SignerSignature } from '@hashgraph/sdk'
import { signMessage as wagmiSignMessage } from 'wagmi/actions'
import { hashMessage, hexToBytes, recoverPublicKey } from 'viem'

export const getAccountId = async <TWallet extends HWBridgeSession>({
  wallet,
  config,
}: {
  wallet: TWallet
  config: Config
}): Promise<string | null> => {
  if (!wallet.signer) return null
  if (wallet.connector.type === ConnectorType.HEDERA)
    return (wallet.signer as HederaSignerType).getAccountId().toString()

  const accountMirrorResponse = await getHederaAccountInfo<{ account: string }>({
    wallet,
    config,
  })

  if (!accountMirrorResponse) {
    return wagmi_getAccount(config).address || null
  }
  return accountMirrorResponse.account
}

export const getPublicKey = async <TWallet extends HWBridgeSession>({
  wallet,
  config,
}: {
  wallet: TWallet
  config: Config
}): Promise<PublicKey | null> => {
  const accountMirrorResponse = await getHederaAccountInfo<{
    key: { _type: 'ECDSA_SECP256K1' | 'ED25519' | 'ProtobufEncoded'; key: string } | null
    evm_address: string
  }>({ wallet, config })
  if (!accountMirrorResponse || !accountMirrorResponse.key) return null

  return PublicKey.fromString(accountMirrorResponse?.key.key)
}

export const getEvmAddress = async <TWallet extends HWBridgeSession>({
  wallet,
  config,
}: {
  wallet: TWallet
  config: Config
}): Promise<string | null> => {
  if (!wallet.signer) return null
  if (wallet.connector.type === ConnectorType.HEDERA) {
    try {
      const accountId = (wallet.signer as HederaSignerType).getAccountId().toString()

      const accountMirrorResponse = await queryMirror<{ evm_address: string }[]>({
        path: `/api/v1/accounts/${accountId}`,
        queryKey: ['getHederaEvmAddress'],
        options: { network: chainToNetworkName(wallet.connector.chain), firstOnly: true },
      })

      if (!accountMirrorResponse?.[0].evm_address) {
        return null
      }

      return accountMirrorResponse[0].evm_address
    } catch (e) {
      console.error(e)
      return null
    }
  }

  return wagmi_getAccount(config).address || null
}

export const getBalance = async <TWallet extends HWBridgeSession>({
  wallet,
  config,
}: {
  wallet: TWallet
  config: Config
}): Promise<UserBalanceResult | null> => {
  if (!wallet.signer) return null

  if (wallet.connector.type === ConnectorType.HEDERA) {
    try {
      const accountId = await getAccountId({ wallet, config })

      const balancesMirrorResponse = await queryMirror<MirrorBalancesResponse[]>({
        path: `/api/v1/balances?account.id=${accountId}`,
        queryKey: ['getBalance'],
        options: { network: chainToNetworkName(wallet.connector.chain) },
      })

      const balance = (balancesMirrorResponse?.[0].balances?.[0]?.balance || 0) / Math.pow(10, DEFAULT_TOKEN_DECIMALS)

      return {
        decimals: DEFAULT_TOKEN_DECIMALS,
        formatted: `${balance} ${DEFAULT_TOKEN_SYMBOL}`,
        symbol: DEFAULT_TOKEN_SYMBOL,
        value: balance,
      } as UserBalanceResult
    } catch (e) {
      console.error('Unable to fetch your balance', e)
      return null
    }
  }

  const { address } = wagmi_getAccount(config)

  if (!address) throw new Error('Could not determine your wallet address')

  const wagmiBalance = await wagmi_getBalance(config, { address })
  const value = Number(wagmiBalance.value) / Math.pow(10, DEFAULT_TOKEN_DECIMALS_ETHEREUM)

  const balance: UserBalanceResult = {
    ...wagmiBalance,
    formatted: value + ' ' + DEFAULT_TOKEN_SYMBOL,
    value,
  }

  return balance
}

export const signAuthentication = async <TWallet extends HWBridgeSession>({
  wallet,
  config,
  message,
}: {
  wallet: TWallet
  config: Config
  message: string
}): Promise<SignerSignature | null> => {
  if (!wallet.signer) return null

  const accountId = await getAccountId({ wallet, config })

  if (!accountId) {
    throw new Error('No account info available. Are you logged in?')
  }

  if (wallet.connector.type === ConnectorType.HEDERA) {
    const concreteSigner = wallet.signer as HederaSignerType
    const hederaSignatures = await concreteSigner.sign([new TextEncoder().encode(message)], {
      encoding: 'base64',
    })

    return hederaSignatures[0]
  } else if (wallet.connector.type == ConnectorType.ETHEREUM) {
    const rawHexEncodedSignature = await wagmiSignMessage(config, { message })

    const rawPublicKey = await recoverPublicKey({
      hash: hashMessage(message),
      signature: rawHexEncodedSignature,
    })

    return new SignerSignature({
      accountId: AccountId.fromString(accountId),
      publicKey: PublicKey.fromBytesECDSA(compressPublicKey(rawPublicKey)),
      signature: hexToBytes(rawHexEncodedSignature),
    })
  }

  return Promise.reject(`Unsuported connector type '${wallet.connector.type}'`)
}

export const getHederaAccountInfo = async <TData = unknown, TWallet extends HWBridgeSession = HWBridgeSession>({
  wallet,
  config,
}: {
  wallet: TWallet
  config: Config
}) => {
  if (!wallet.signer) return null

  let idOrAliasOrEvmAddress: string | `0x${string}` | undefined = ''

  if (wallet.connector.type === ConnectorType.HEDERA) {
    idOrAliasOrEvmAddress = (wallet.signer as HederaSignerType).getAccountId().toString()
  } else if (wallet.connector.type == ConnectorType.ETHEREUM) {
    idOrAliasOrEvmAddress = wagmi_getAccount(config).address
  }

  try {
    const accountMirrorResponse = await queryMirror<TData[]>({
      path: `/api/v1/accounts/${idOrAliasOrEvmAddress}`,
      queryKey: ['getHederaAccount'],
      options: { network: chainToNetworkName(wallet.connector.chain), firstOnly: true },
    })

    if (!accountMirrorResponse?.[0] || JSON.stringify(accountMirrorResponse).indexOf('Not found') != -1) {
      return null
    }

    return accountMirrorResponse[0]
  } catch (e) {
    console.error(e)
    return null
  }
}
