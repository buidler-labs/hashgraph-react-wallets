---
outline: deep
---

# useAccountInfo()

Use it to fetch the connected account info from public mirror node.

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useAccountInfo } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: accountInfo } = useAccountInfo()

  return <span>{accountInfo.max_automatic_token_associations ?? '-'}</span>
}
```

## Parameters

```ts
interface IUseAccountInfoProps<Connector> {
  connector?: Connector | null
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Request the account id for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useAccountInfo } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: accountInfo } = useAccountInfo({ connector: HashpackConnector }) // [!code focus]

  return <span>{accountInfo.max_automatic_token_associations ?? '-'}</span>
}
```

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useAccountInfo } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet()
  const { data: accountInfo } = useAccountInfo({ autoFetch: isConnected }) // [!code focus]

  return <span>{accountInfo.max_automatic_token_associations ?? '-'}</span>
}
```

## Return Type

Returns a [`TanStack query result`](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) where `TData` is the response from `https://mainnet.mirrornode.hedera.com/api/v1/accounts/{idOrAliasOrEvmAddress}`

Read more on [Hedera Rest API Docs](https://docs.hedera.com/hedera/sdks-and-apis/rest-api#api-v1-accounts-idoraliasorevmaddress)

```ts
type UseQueryResult<TData, Error>
```
