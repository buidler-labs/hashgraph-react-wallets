---
outline: deep
---

# useWriteContract()

Use it to execute a smart contract function

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { ContractId } from "@hashgraph/sdk";
import { useWriteContract } from '@buidlerlabs/hashgraph-react-wallets'
import { counterABI } from './ABIs'

const App = () => {
  const { writeContract } = useWriteContract();

  const handleIncrementCounter = async () => {
    try {
      const transactionIdOrHash = await writeContract({
        contractId: ContractId.fromString("0.0.123456"),
        abi: counterABI,
        functionName: 'increment',
        metaArgs: { gas: 120_000 },
      })

      // check the transaction status using `useWatchTransactionReceipt`
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleIncrementCounter}>Increment</button>
```

## Parameters

```ts
interface IUseWriteContractProps<Connector> {
  connector?: Connector | null
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Executing a smart contract function with a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { ContractId } from "@hashgraph/sdk";
import { useWriteContract } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { counterABI } from './ABIs'

const App = () => {
  const { writeContract } = useWriteContract({
    connector: HashpackConnector
  });

  const handleIncrementCounter = async () => {
    try {
      const transactionIdOrHash = await writeContract({
        contractId: ContractId.fromString("0.0.123456"),
        abi: counterABI,
        functionName: 'increment',
        metaArgs: { gas: 120_000 },
      })

      // check the transaction status using `useWatchTransactionReceipt`
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleIncrementCounter}>Increment</button>
```

## `WriteContractOptions`

#### - contractId

- Type: `ContractId | string`
- Required: `true`

The contract id to be called.

---

#### - abi

- Type: `abi extends Abi | readonly unknown[]`
- Required: `true`

The contract ABI.

---

#### - functionName

- Type: `ContractFunctionName<abi, 'nonpayable' | 'payable'`
- Required: `true`

The contract function name to be called.

---

#### - metaArgs

- Type: `TransactionMetaArguments`
- Required: `false`

The transaction meta arguments.

```ts
type TransactionMetaArguments = {
  gas: Hbar | number
  amount: number
  maxTransactionFee: Hbar | number
  nodeAccountIds: AccountId[]
  transactionId: TransactionId
  transactionMemo: string
  transactionValidDuration: number
}
```

---

#### - args

- Type: `args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>`
- Required: `true`

The contract function arguments.

## Return Type

```ts
type TResult = {
  writeContract: async <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  >(parameters: WriteContractOptions): Promise<TData>
}
```
