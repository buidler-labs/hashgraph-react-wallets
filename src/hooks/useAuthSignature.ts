import { HWBridgeConnector } from '../hWBridge/connectors/types'
import { useWallet } from './useWallet'
import { tanstackQueryClient, useAccountId } from '..'
import { useConfig } from 'wagmi'
import { HWBridgeQueryKeys } from '../constants'
import { SignerSignature } from '@hashgraph/sdk'
import { signAuthentication } from '../actions'
export class UserRefusedToSignAuthError extends Error {}

export function useAuthSignature<TConnector extends HWBridgeConnector>(connector?: TConnector | null) {
  const wallet = useWallet(connector)
  const config = useConfig()
  let { data: connectedAccountId } = useAccountId({ connector })

  const handleSignAuth = async (message?: string): Promise<SignerSignature> => {
    const messageToSign = message == null ? `${new Date().getTime()}` : message

    if (connectedAccountId == null) {
      return Promise.reject('No account info available. Are you logged in?')
    }

    try {
      const signature = await tanstackQueryClient.fetchQuery({
        queryKey: [HWBridgeQueryKeys.SIGN_AUTHENTICATION, connectedAccountId, messageToSign],
        queryFn: () =>
          signAuthentication({
            wallet,
            config,
            message: messageToSign,
          }),
      })

      if (signature == null) {
        return Promise.reject('There was an issue retrieving the auth-signature')
      }

      return signature
    } catch (e) {
      console.error(e)

      if (
        e.message != undefined &&
        (e.message === 'USER_REJECT' || // HashPack
          e.message === 'User rejected the request.' || // Metamask
          e.message === 'USER_REJECTED_METHODS') // Kabila
      ) {
        return Promise.reject(new UserRefusedToSignAuthError('User refused to sign the auth-payload'))
      }

      return Promise.reject(e)
    }
  }

  return {
    signAuth: handleSignAuth,
  }
}
