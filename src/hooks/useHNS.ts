import { useConfig } from 'wagmi'
import { getHNSName } from '../actions'
import { HWBridgeConnector } from '../hWBridge/connectors/types'
import { useWallet } from './useWallet'
import { useQuery } from '@tanstack/react-query'
import { HWBridgeQueryKeys } from '../constants'

interface IUseHNSProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}

export function useHNS<TConnector extends HWBridgeConnector>(props?: IUseHNSProps<TConnector>) {
  const wallet = useWallet(props?.connector)
  const config = useConfig()
  const enabled = Boolean(wallet?.signer && (props?.autoFetch ?? true))

  return useQuery({
    queryKey: [HWBridgeQueryKeys.GET_HNS, wallet.lastUpdated],
    queryFn: () => getHNSName({ wallet, config }),
    enabled,
  })
}
