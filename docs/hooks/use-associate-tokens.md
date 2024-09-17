---
outline: deep
---

# useAssociateTokens()

Use it to execute a `TokenAssociateTransaction` to link tokens with your account.

## Usage

```tsx
import { useAssociateTokens } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { associateTokens } = useAssociateTokens();

  const handleAssociateTokens = async () => {
    try {
      const transactionIdOrHash = await associateTokens(['0.0.123456']);
      ...
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

## Parameters
```ts
interface IUseAssociateTokensProps<Connector> {
  connector?: Connector | null
  abi?: Abi
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Execute the transaction with a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useAssociateTokens } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { associateTokens } = useAssociateTokens({connector: KabilaConnector});

  const handleAssociateTokens = async () => {
    try {
      const transactionIdOrHash = await associateTokens(['0.0.123456']);
      ...
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

#### - abi

- Type: `Abi` [read more](https://viem.sh/docs/glossary/types.html#abi)
- Required: `false`

::: details

The default `ABI` used to execute the `associate` function on the provided token contracts with EVM-compatible wallets.

```json
[
  {
    "inputs": [],
    "name": "associate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "responseCode",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

:::

## Return Type

```ts
type TResult = {
  associateTokens: (tokens: string) : Promise<TData>
}
```
