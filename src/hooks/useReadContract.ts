import { HWBridgeConnector } from '../hWBridge/types'
import { useWallet } from './useWallet'
import { readContract } from '../actions'
import { tanstackQueryClient } from '..'
import { HWBridgeQueryKeys } from '../constants'
import { Chain, createPublicClient } from 'viem'

interface IUseReadContractProps<Connector> {
  connector?: Connector | null
  chain?: Chain
}

export function useReadContract<TConnector extends HWBridgeConnector>(props?: IUseReadContractProps<TConnector>) {
  const { connector, chain } = props || {}
  const wallet = useWallet(connector)

  const handleWriteContract = async <
    readParameters extends Parameters<ReturnType<typeof createPublicClient>['readContract']>[0],
  >(
    parameters: readParameters,
  ) => {
    return tanstackQueryClient.fetchQuery({
      queryKey: [HWBridgeQueryKeys.READ_CONTRACT, wallet.lastUpdated],
      queryFn: () =>
        readContract({
          wallet,
          parameters,
          chain,
        }),
    })
  }

  return {
    readContract: handleWriteContract,
  }
}
