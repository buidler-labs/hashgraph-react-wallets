---
outline: deep
---

# useApproveTokenNftAllowance()

Use it to execute an `AccountAllowanceApproveTransaction` that allows you to delegate a token spender to spend a specified token amount on your behalf.

## Usage

```tsx
import { useApproveTokenNftAllowance } from '@buidlerlabs/hashgraph-react-wallets'

const TOKENS = [{ tokenId: "0.0.123456", serial: 1 }];
const SPENDER = "0.0.123456";

const App = () => {
  const { approve } = useApproveTokenNftAllowance()

  const handleApproveNftAllowance = async () => {
    try {
      const transactionIdOrHash = await approve(TOKENS, SPENDER);
      ...
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleApproveNftAllowance}>Approve</button>
}
```

## Parameters

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Execute the transaction with a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```ts
interface IUseApproveTokenNftAllowanceProps<Connector> {
  connector?: Connector | null
  abi?: Abi
}
```

---

#### - abi

- Type: `Abi` [read more](https://viem.sh/docs/glossary/types.html#abi)
- Required: `false`

::: details

The default `ABI` used to execute the `approve` function on the provided token contracts with EVM-compatible wallets.

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "response",
        "type": "bool"
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
  approve: (
    tokens: {
      tokenId: TokenId | string
      serial: number
    }[],
    spender: AccountId | ContractId | string
  ) : Promise<TData>
}
```
