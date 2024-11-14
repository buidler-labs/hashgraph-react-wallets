---
outline: deep
---

# useReadContract()

Use it to read a smart contract state via JSON-RPC.

::: info
The built-in chain configurations default to using the [hashio.io](https://hashio.io) JSON-RPC relay.
:::

## Usage

```tsx
import { ContractId } from "@hashgraph/sdk";
import { useReadContract } from '@buidlerlabs/hashgraph-react-wallets'
import { counterABI } from './ABIs'

const CONTRACT_ID = ContractId.fromString("0.0.123456");

const App = () => {
  const { readContract } = useReadContract();

  const handleGetCount = async () => {
    try {
      const count = await readContract({
        address: `0x${CONTRACT_ID.toSolidityAddress()}`,
        abi: counterABI,
        functionName: 'get',
      })

      console.log(Number(count))
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleGetCount}>Get count</button>
```

## Parameters

```ts
interface IUseWriteContractProps<Connector> {
  connector?: Connector | null
  chain?: Chain
}
```

::: warning
By default, this implementation uses the chain configuration of the currently connected wallet. To use it without a connected wallet, specify the `chain` parameter in the configuration.
:::

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

#### - chain

- Type: `Chain`
- Required: `false`

## `readContract()`

Read more about its usage on [viem.sh](https://viem.sh/docs/contract/readContract#parameters)

## Return Type

```ts
// import { createPublicClient } from 'viem'

type TResult = {
  readContract: async <
    readParameters extends Parameters<ReturnType<typeof createPublicClient>['readContract']>[0],
  >(
    parameters: readParameters,
  ): Promise<TData>
}
```
