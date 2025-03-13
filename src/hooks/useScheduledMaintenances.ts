import { HWBridgeConnector } from '../hWBridge/types'
import { useWallet } from './useWallet'
import { getActiveScheduledMaintenances, getScheduledMaintenances } from '../actions'
import { HWBridgeQueryKeys } from '../constants'
import { Chain } from 'viem'
import { useQuery } from '@tanstack/react-query'

interface IUseScheduledMaintenances<Connector> {
  connector?: Connector | null
  chain?: Chain
  activeOnly?: boolean
}

export function useScheduledMaintenances<TConnector extends HWBridgeConnector>(
  props?: IUseScheduledMaintenances<TConnector>,
) {
  const { connector, chain, activeOnly = true } = props || {}
  const wallet = useWallet(connector)

  return useQuery({
    queryKey: [HWBridgeQueryKeys.GET_NETWORK_MAINTENANCE_STATUS, wallet.lastUpdated],
    queryFn: () => {
      const handler = activeOnly ? getActiveScheduledMaintenances : getScheduledMaintenances

      return handler({
        wallet,
        chain,
      })
    },
  })
}
