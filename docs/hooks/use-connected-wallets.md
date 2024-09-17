---
outline: deep
---

# useConnectedWallets()

Use it to get a list of the connected wallets when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession). 

Each wallet connection is represented by a `HWBridgeSession` which will provide a bunch of info and handlers in order to manage its state.

## Usage
```tsx
import { useConnectedWallets } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const connectedWallets = useConnectedWallets()

  return ...
}
```

## Return Type

```tsx
interface HWBridgeSession {
  connect: (props?: ConnectionConfig): Promise<HWBridgeSession>,
  disconnect: (): Promise<boolean>,
  autoPaired: boolean,
  connector: HWBridgeConnectorInstance,
  extensionReady: boolean,
  isConnected: boolean,
  isExtensionRequired: boolean,
  isInitialized: boolean,
  isLoading: boolean,
  lastUpdated: number,
  sdk: ConnectorSDKs,
  sessionId: string,
  signer: HWBridgeSigner
}[]
```
