---
outline: deep
---

# useAuthSignature()

Use it to sign a custom, prefix guarded, string message which can be verified off-ledger (ie. helpful when doing web session, for instance). 

Please be aware that, depending if the connector is of `HEDERA` or `ETHEREUM` type, different prefixes are added to the message as indicated in their respectful chain docs. This means that a `Metamask` signature will not match the signature of a `HashPack` prompt.

## Usage

```tsx
import { useAuthSignature, UserRefusedToSignAuthError } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { signAuth } = useAuthSignature()

  const handleAuthenticate = async () => {
    try {
      const signerSignature = await signAuth("some message to sign");

      // `signerSignature` contains the user-auth signature
    } catch (e) {
      if (e instanceof UserRefusedToSignAuthError) {
        // TODO: User rejected the signature request
      }
    }
  }

  return <button onClick={handleAuthenticate}>Authenticate</button>
}
```

You can call `signAuth` with no argument in which case the stringified value of `new Date().getTime()` is used.

## Parameters

#### - connector

- Type: `HWBridgeConnector`
- Required: `false`

Execute the transaction with a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

---

:::

## Return Type

A `@hashgraph/sdk` [`SignerSignature`](https://github.com/hashgraph/hedera-sdk-js/blob/0444d08908288b9a0666a0ae704f9869005f9f96/src/SignerSignature.js#L26) value.
