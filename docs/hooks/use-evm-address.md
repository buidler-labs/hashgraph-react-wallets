---
outline: deep
---

# useEvmAddress()

Use it to fetch the connected account EVM address.

::: info
Unlike [`useAccountId`](/hooks/use-account-id), this hook can retrieve the EVM address of the connected wallet, whether it's a native or EVM-compatible wallet.
:::

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: evmAddress } = useEvmAddress()

  return <span>{evmAddress ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseEvmAddressProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector
* Type: `HWBridgeConnector`
* Required: `false`

Request the EVM address for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: evmAddress } = useEvmAddress({ connector: HashpackConnector }) // [!code focus]

  return <span>{evmAddress ?? '-'}</span>
}
```

---

#### - autoFetch
* Type: `boolean`
* Required: `false`

```tsx
import { useWallet, useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet() // [!code focus]
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected }) // [!code focus]

  return <span>{evmAddress ?? '-'}</span>
}
```

## Return Type

Returns a [`TanStack query result`](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) where `TData` is a `string`

```ts
type UseQueryResult<string | null, Error>
```
