---
outline: deep
---

# useHNS()

Use it to retrieve your HNS domain names info.

When a connector is passed to `<HWBridgeProvider>`, it can take a `hnsResolver` property as its own config.

::: tip
The `HashpackConnector` comes with a built-in HNS Resolver based on [`hashpack user profiles`](https://docs.hashpack.app/dapp-developers/user-profiles), which means it will not require to pass a `hnsResolver` config for it.

But, the same HNS Resolver can be used for the rest of the connectors.

```tsx
import { HWBridgeProvider } from "@buidlerlabs/hashgraph-react-wallets";
import {
  HashpackConnector,
  KabilaConnector
} from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { HashpackHNSResolver } from "@buidlerlabs/hashgraph-react-wallets/hns-resolvers"; // [!code focus]

return (
  <HWBridgeProvider
    ...
    connectors={[
      HashpackConnector,
      [KabilaConnector, { hnsResolver: HashpackHNSResolver }] // [!code focus]
    ]}
  />
)
```

:::

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useHNS } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: hnsData } = useHNS()

  return <span>{hnsData?.hnsName ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseHNSProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Request the HNS data for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useHNS } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: hnsData } = useHNS({ connector: HashpackConnector }) // [!code focus]

  return <span>{hnsData.hnsName ?? '-'}</span>
}
```

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useHNS } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet() // [!code focus]
  const { data: hnsData } = useHNS({ autoFetch: isConnected }) // [!code focus]

  return <span>{hnsData.hnsName ?? '-'}</span>
}
```

## Return Type

```ts
type HNSResult = {
  hnsName: string
  avatar: string
  tokenId: string
  serial: number
}
```
