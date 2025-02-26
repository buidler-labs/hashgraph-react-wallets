---
outline: deep
---

# useScheduledMaintenances()

Retrieves the scheduled maintenance events for the Hedera network.

::: info
This hook fetches data from the Hedera status page `https://status.hedera.com`
:::

## Usage

```tsx
import { useScheduledMaintenances } from "@buidlerlabs/hashgraph-react-wallets";
import { HederaTestnet } from "@buidlerlabs/hashgraph-react-wallets/chains";

const App = () => {
  const { data: networkMaintenances } = useScheduledMaintenances({
    chain: HederaTestnet
  });

  return <pre>{JSON.stringify(networkMaintenances, null, 2)}</pre>
```

## Parameters

```ts
interface IUseScheduledMaintenances<Connector> {
  connector?: Connector | null
  chain?: Chain
  activeOnly?: boolean
}
```

::: warning
By default, this hook uses the chain configuration of the currently connected wallet. If no wallet is connected, you must explicitly specify the `chain` parameter
:::

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

#### - chain

- Type: `Chain`
- Required: `false`

#### - activeOnly

- Type: `boolean`
- Required: `false`
- Default: `true`
- Description: If set to `true`, only active scheduled maintenance events are returned.

## Return Type

```ts
type NetworkScheduledMaintenances = {
  page: {
    id: string
    name: string
    url: string
    time_zone: string
    updated_at: string
  }
  scheduled_maintenances: {
    id: string
    name: string
    status: string
    created_at: string
    updated_at: string
    monitoring_at: string
    resolved_at: string
    impact: string
    shortlink: string
    started_at: string
    page_id: string
    incident_updates: {
      id: string
      status: string
      body: string
      incident_id: string
      created_at: string | null
      updated_at: string | null
      display_at: string | null
      affected_components: {
        code: string
        name: string
        old_status: string
        new_status: string
      }[]
      deliver_notifications: boolean
      custom_tweet: number | null
      tweet_id: number
    }[]
    components: {
      id: string
      name: string
      status: string
      created_at: string
      updated_at: string
      position: number
      description: string
      showcase: boolean
      start_date: string | null
      group_id: string | null
      page_id: string
      group: boolean
      only_show_if_degraded: boolean
    }[]
    scheduled_for: string
    scheduled_until: string
  }[]
}
```
