# Connect a wallet

By using `useWallet` hook, you can simply call `connect` method, and your wallet should pop up with a connection request.

Furthermore, it allows you to craft great user experiences by giving you access different wallet states such as `isExtensionRequired`, `extensionReady` or `isConnected`.

Following is a snippet of how one might go about doing just that:

```tsx
import { KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'

const WalletBtn = () => {
  const { isExtensionRequired, extensionReady, isConnected, connect, disconnect, connector } =
    useWallet(KabilaConnector)

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error(error.message)
    }
  }

  if (isExtensionRequired && !isExtensionReady) {
    return <span>Extension not found. Pease install it</span>
  }

  if (isConnected) {
    return <button onClick={disconnect}>Disconnect</button>
  }

  return <button onClick={handleConnect}>Connect</button>
}
```
