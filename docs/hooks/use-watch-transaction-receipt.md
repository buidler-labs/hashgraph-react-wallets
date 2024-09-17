---
outline: deep
---

# useWatchTransactionReceipt()

Use it to retrieve the transaction status after it's being sent over the wire by polling the public [mirror node](https://docs.hedera.com/hedera/core-concepts/mirror-nodes).

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useAssociateTokens, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { associateTokens } = useAssociateTokens()
  const { watch } = useWatchTransactionReceipt()

  const handleAssociateTokens = async () => {
    try {
      const hashOrTransactionId = await associateTokens(['0.0.123456'])

      watch(hashOrTransactionId, {
        onSuccess: (transaction) => {
          // do stuff

          return transaction
        },
        onError: (transaction, error) => {
          // do stuff

          return transaction
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

## Parameters

```ts
interface IUseWatchTransactionReceiptProps<Connector, abi extends Abi | readonly unknown[]> {
  connector?: Connector | null
  abi?: abi
  retryInterval?: number
  retryMaxAttempts?: number
}
```

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Watch the transaction status using a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useAssociateTokens, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { associateTokens } = useAssociateTokens({ connector: HashpackConnector }) // [!code focus]
  const { watch } = useWatchTransactionReceipt({ connector: HashpackConnector }) // [!code focus]

  const handleAssociateTokens = async () => {
    try {
      const hashOrTransactionId = await associateTokens(['0.0.123456'])

      watch(hashOrTransactionId, {
        onSuccess: (transaction) => {
          // do stuff

          return transaction
        },
        onError: (transaction, error) => {
          // do stuff

          return transaction
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

---

#### - abi

- Type: `Abi`
- Required: `false`

::: info
There are many situations where a smart contract can revert an execution and throw an error, such as:

```solidity
 function deposit(uint256 _amount) external nonReentrant {
        if (_amount == 0) revert ZeroAmount();

       ...
    }
```

which in the end this error is being hex encoded.

The resulting error is `hex-encoded`and, based on the provided abi, this hook is also responsible for attempting to decode the error using [`decodeErrorResult`](https://viem.sh/docs/contract/decodeErrorResult#decodeerrorresult)

:::

```tsx
import { useAssociateTokens, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'
import { contractABI } from './ABIs'

const App = () => {
  const { associateTokens } = useAssociateTokens()
  const { watch } = useWatchTransactionReceipt({
    abi: contractAbi, // [!code focus]
  })

  const handleAssociateTokens = async () => {
    try {
      const hashOrTransactionId = await associateTokens(['0.0.123456'])

      watch(hashOrTransactionId, {
        onSuccess: (transaction) => {
          // do stuff

          return transaction
        },
        onError: (transaction, error) => {
          const { errorName, abiItem } = error // [!code focus]

          // map the errors by `errorName`

          return transaction
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

---

#### - retryInterval

- Type: `number`
- Default: `2000ms`
- Required: `false`

The interval between the `http` requests.

---

#### - retryMaxAttempts

- Type: `number`
- Default: `10`
- Required: `false`

The delay between the `http` requests.

## Return Type

```ts
type TSuccessCallback = <Transaction extends { transaction_id: string }>(transaction: Transaction) => Transaction

type TErrorCallback = <Transaction extends { transaction_id: string }>(
  transaction: Transaction,
  error: string | DecodeErrorResultReturnType | null,
) => Transaction

type TResult = {
  watch: (
    transactionIdOrHash: string,
    callbacks: {
      onSuccess: TSuccessCallback
      onError: TErrorCallback
    },
  ) => Promise<TData>
}
```
