---
outline: deep
---

# useChain()

Use it to retrieve the current chain info.

::: info
  When a dApp is running on one chain but the connected extension allows switching to a different one (e.g. Metamask), this hook can be useful for displaying an error message based on the `chainData.error` property.
:::

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useChain } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: chainData } = useChain()

  if (chainData?.error) {
    return <span>{chainData.error}</span>
  }

  return <span>Chain: {chainData.chain.name ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseChainIdProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Request chain data for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { MatamaskConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useChain } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: chainData } = useChain({ connector: MatamaskConnector }) // [!code focus]

  if (chainData?.error) {
    return <span>{chainData.error}</span>
  }

  return <span>Chain: {chainData.chain.name ?? '-'}</span>
}
```

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useChain } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet()
  const { data: chainData } = useChain({ autoFetch: isConnected }) // [!code focus]

  if (chainData?.error) {
    return <span>{chainData.error}</span>
  }

  return <span>Chain: {chainData.chain.name ?? '-'}</span>
}
```

## Return Type

```ts
type Promise<{ chain?: Chain | null; error: string | null } | null>
```
