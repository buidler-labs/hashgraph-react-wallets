# Execute transactions

Our collection of [`React Hooks`](/hooks/) aims to cover all developer's needs for interacting with the Hedera network, though there are a few exceptions that can be easily handled.

In the following examples, we demonstrate two ways to execute one of the most popular transactions on the network: the `TokenAssociateTransaction`.

### Using `useAssociateTokens` hook:

::: tip
This will handle both situations when a native or EVM compatible wallet is connected.
:::

```tsx
import { useAssociateTokens } from '@buidlerlabs/hashgraph-react-wallets'

const TOKENS_TO_ASSOCIATE = ["0.0.123456"]

const App = () => {
  const { associateTokens } = useAssociateTokens()

  const handleAssociateTokens = async () => {
    try {
      const transactionIdOrHash = await associateTokens(TOKENS_TO_ASSOCIATE);
    } catch (e) {
      console.error(error)
    }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```

### Using `@hashgraph/sdk` token associate transaction:

::: warning
This approach will not work for EVM wallets where a `writeContract` action per `tokenId` needs to be dispatched using the following ABI:

```json
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
```

:::

But if you're looking to support only the native wallets like `Haskpack`,`Kabila` or `Blade`, you can use the following example: 

```tsx [Native Wallet]
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { TokenAssociateTransaction } from '@hashgraph/sdk'

const TOKENS_TO_ASSOCIATE = ['0.0.123456']

const App = () => {
  const { signer } = useWallet()
  const { associateTokens } = useAssociateTokens()

  const handleAssociateTokens = async () => {
    const transaction = new TokenAssociateTransaction()
      .setAccountId(signer.getAccountId())
      .setTokenIds(TOKENS_TO_ASSOCIATE)

    const signTx = await transaction.freezeWithSigner(signer)
    const txResponse = await signTx.executeWithSigner(signer)
  }

  return <button onClick={handleAssociateTokens}>Associate</button>
}
```
