import { useScheduledMaintenances } from '@buidlerlabs/hashgraph-react-wallets'
import { hederaTestnet } from 'viem/chains'

const ScheduledMaintenances = () => {
  const { data: networkMaintenances } = useScheduledMaintenances({
    chain: hederaTestnet,
  })

  return (
    <div>
      Active maintenances: <pre>{JSON.stringify(networkMaintenances?.scheduled_maintenances, null, 2)}</pre>
    </div>
  )
}

export default ScheduledMaintenances
