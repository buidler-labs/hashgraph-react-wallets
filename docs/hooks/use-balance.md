---
outline: deep
---

# useBalance()

Use it to retrieve the `ℏ (Hbar)` balance of the connected account.

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: balance } = useBalance()

  return <span>{balance.formatted ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseBalanceProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Request the balance for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: balance } = useBalance({ connector: HashpackConnector }) // [!code focus]

  return <span>{balance.formatted ?? '-'}</span>
}
```

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet()
  const { data: balance } = useBalance({ autoFetch: isConnected }) // [!code focus]

  return <span>{balance.formatted ?? '-'}</span>
}
```

## Return Type

```ts
type UserBalanceResult = {
  decimals: number
  formatted: string
  symbol: string
  value: BigInt | number
}
```

Returns a [`TanStack query result`](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) where `TData` is `UserBalanceResult`

```ts
type UseQueryResult<TData, Error>
```
