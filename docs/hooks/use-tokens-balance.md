---
outline: deep
---

# useTokensBalance()

Use it to retrieve the balance of:

- All the associated tokens when `tokens` property is not passed.
- The balance of the provided `tokens` list.

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

Request the balance for all the associated tokens with the current account:

```tsx
import { useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: tokensBalance } = useTokensBalance()

  return (
    <ul>
      {(tokensBalance ?? []).map(({ token_id, balance }) => (
        <li key={token_id}>
          <span>{token_id}</span> - <span>{balance}</span>
        </li>
      ))}
    </ul>
  )
}
```

## Parameters

```ts
interface IUseTokensBalanceProps<Connector> {
  connector?: Connector | null
  accountId?: string
  tokens?: string[]
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Request the tokens balance for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: tokensBalance } = useTokensBalance({ connector: HashpackConnector }) // [!code focus]

  return (
    <ul>
      {(tokensBalance ?? []).map(({ token_id, balance }) => (
        <li key={token_id}>
          <span>{token_id}</span> - <span>{balance}</span>
        </li>
      ))}
    </ul>
  )
}
```

---

#### - accountId

- Type: `string`
- Required: `false`

Retrieve the balance of the associated tokens for a different account.

```tsx
import { useWallet, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet() // [!code focus]
  const { data: tokensBalance } = useTokensBalance({ autoFetch: isConnected }) // [!code focus]

  return (
    <ul>
      {(tokensBalance ?? []).map(({ token_id, balance }) => (
        <li key={token_id}>
          <span>{token_id}</span> - <span>{balance}</span>
        </li>
      ))}
    </ul>
  )
}
```

#### - tokens

- Type: `string[]`
- Required: `false`

Retrieve the balance of the provided tokens IDs.

```tsx
import { useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { data: tokensBalance } = useTokensBalance({
    tokens: ['0.0.123456', '0.0.654321'], // [!code focus]
  })

  return (
    <ul>
      {(tokensBalance ?? []).map(({ token_id, balance }) => (
        <li key={token_id}>
          <span>{token_id}</span> - <span>{balance}</span>
        </li>
      ))}
    </ul>
  )
}
```

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet() // [!code focus]
  const { data: tokensBalance } = useTokensBalance({ autoFetch: isConnected }) // [!code focus]

  return (
    <ul>
      {(tokensBalance ?? []).map(({ token_id, balance }) => (
        <li key={token_id}>
          <span>{token_id}</span> - <span>{balance}</span>
        </li>
      ))}
    </ul>
  )
}
```

## Return Type

```ts
type TTokensBalanceResult = {
  automatic_association: boolean
  balance: number
  created_timestamp: string
  decimals: number
  token_id: string
  freeze_status: string
  kyc_status: string
}
```

Returns a [`TanStack query result`](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) where `TData` is `TTokensBalanceResult[]`

```ts
type UseQueryResult<TTokensBalanceResult[], Error>
```
