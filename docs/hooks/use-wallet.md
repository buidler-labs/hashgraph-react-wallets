---
outline: deep
---

# useWallet()

Each wallet connection is represented by a `HWBridgeSession` which will provide a bunch of info and handlers in order to manage its state.

## Usage

When parameter [`multiSession={false}`](/configuration.html#%F0%9F%94%80-multisession):

```tsx
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const wallet = useWallet()

  return ...
}
```

## Parameters

#### - connector
* Type: `HWBridgeConnector`
* Required: `false`

Request the current state for a specific wallet when [`multiSession={true}`](/configuration.html#%F0%9F%94%80-multisession)

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const wallet = useWallet(HashpackConnector) // [!code focus]

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
}
```
