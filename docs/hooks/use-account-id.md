---
outline: deep
---

# useAccountId()

Use it to fetch the connected account id.

::: info
You can connect an EVM account even if it's not a valid Hedera entity, but in this case, the result type will be slightly different as follows:

- Native: `shardNum.realmNum.accountNum`
- EVM: `0x${string}`
  :::

::: tip
Send some hbar to your EVM address (`0x${string}`) and the account will be automatically created on Hedera network.
:::

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: accountId } = useAccountId()

  return <span>{accountId ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseAccountIdProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector: `HWCConnector`

Request the account id for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: accountId } = useAccountId({ connector: HashpackConnector }) // [!code focus]

  return <span>{accountId ?? '-'}</span>
}
```

#### - autoFetch: `boolean`

```tsx
import { useWallet, useAccountId } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet()
  const { data: accountId } = useAccountId({ autoFetch: isConnected }) // [!code focus]

  return <span>{accountId ?? '-'}</span>
}
```

###

## Return Type

Returns a [`TanStack query result`](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) where `TData` is a `string`

```ts
type UseQueryResult<string | null, Error>
```
