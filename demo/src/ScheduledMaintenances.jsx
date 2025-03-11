import { useScheduledMaintenances } from '@buidlerlabs/hashgraph-react-wallets'
import { HederaTestnet } from '@buidlerlabs/hashgraph-react-wallets/chains'

const ScheduledMaintenances = () => {
  const { data: networkMaintenances } = useScheduledMaintenances({
    chain: HederaTestnet,
  })

  return (
    <div>
      Active maintenances: <pre>{JSON.stringify(networkMaintenances?.scheduled_maintenances, null, 2)}</pre>
    </div>
  )
}

export default ScheduledMaintenances
