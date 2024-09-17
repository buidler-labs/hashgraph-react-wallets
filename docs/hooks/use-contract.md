---
outline: deep
---

# useContract()

Use it to get a [`viem's contract instance`](https://viem.sh/docs/contract/getContract.html#contract-instances).

::: warning
This hook is still in early development and currently only works with EVM-compatible wallets, allowing interaction with contract instances via JSON-RPC.
:::

## Usage

```tsx
import { useContract } from '@buidlerlabs/hashgraph-react-wallets'
import { contractABI } from './ABIs'

const App = () => {
  const contract = useContract({
    address: '0x123...321',
    abi: contractABI
  })


  // do stuff

  return ...
}
```

## Parameters

```ts
interface IUseContractProps<Connector> {
  connector?: Connector | null
  abi: Abi
  address: `0x${string}`
  autoFetch?: boolean
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Use it to pass the contract [`client`](https://viem.sh/docs/contract/getContract.html#client) based on the connected wallet [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { MetamaskConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors' // [!code focus]
import { useContract } from '@buidlerlabs/hashgraph-react-wallets'
import { contractABI } from './ABIs'

const App = () => {
  const contract = useContract({
    connector: MetamaskConnector, // [!code focus]
    address: '0x123...321',
    abi: contractABI
  })

  // do stuff

  return ...
}
```

---

#### - abi

- Type: `Abi`
- Required: `true`

---

#### - address

- Type: `0x${string}`
- Required: `true`

---

#### - autoFetch

- Type: `boolean`
- Required: `false`

```tsx
import { useWallet, useContract } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { isConnected } = useWallet() // [!code focus]
  const contract = useContract({
    address: '0x123...321',
    abi: contractABI
    autoFetch: isConnected, // [!code focus]
  })

  // do stuff

  return ...
}
```

## Return Type

[Read more on viem docs](https://viem.sh/docs/contract/getContract.html#return-value)
