# Connect a wallet

By using `useWallet` hook, you can simply call `connect` method, and your wallet should pop up with a connection request.

Also, it provides different wallet states like `isExtensionRequired`, `extensionReady`, `isConnected` in order to develop a great user experience.

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
