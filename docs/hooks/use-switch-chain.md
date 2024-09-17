---
outline: deep
---

# useSwitchChain()

Use it to switch the chain from user interface.

::: warning
This hook works only with wallets that support this action (e.g., MetaMask). If the wallet doesn't support it, the following error message will be thrown: `Unsupported wallet operation`.
:::

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useWallet, useChain, useSwitchChain } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet()
  const { data: chainData } = useChain()
  const { chains, switchChain } = useSwitchChain()

  return (
    <select
      value={chainData?.chain?.id || 1}
      onChange={(e) => switchChain(parseInt(e.target.value))}
      disabled={!isConnected}
    >
      {chains?.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
```

## Parameters

```ts
interface IUseSwitchChainProps<Connector> {
  connector?: Connector | null
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Switch chain for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { MatamaskConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useSwitchChain } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { switchChain } = useSwitchChain({ connector: MatamaskConnector }) // [!code focus]

  const handleSwitchChain = (chainId: number) => {
    try {
      switchChain(296)
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleSwitchChain}>Switch chain</button>
}
```

## Return Type

```ts
type TResult = {
  chains: Chain[]
  switchChain: (chainId: string) => Promise<TData>
}
```
