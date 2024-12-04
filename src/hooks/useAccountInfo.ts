import { useConfig } from 'wagmi'
import { getHederaAccountInfo } from '../actions'
import { HWBridgeConnector } from '../hWBridge/connectors/types'
import { useWallet } from './useWallet'
import { useQuery } from '@tanstack/react-query'
import { useChain } from './useChain'
import { HWBridgeQueryKeys } from '../constants'

interface IUseAccountInfoProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}

export function useAccountInfo<TData extends unknown, TConnector extends HWBridgeConnector = HWBridgeConnector>(
  props?: IUseAccountInfoProps<TConnector>,
) {
  const wallet = useWallet(props?.connector)
  const { data: chainData } = useChain()
  const config = useConfig()
  const enabled = Boolean(wallet?.signer && (props?.autoFetch ?? true))

  return useQuery<TData | null>({
    queryKey: [HWBridgeQueryKeys.ACCOUNT_INFO, wallet.lastUpdated, chainData?.chain?.id],
    queryFn: () => (chainData?.error ? null : getHederaAccountInfo({ wallet, config })),
    enabled,
  })
}
