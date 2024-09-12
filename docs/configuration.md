---
outline: deep
---

# Configuration

## Wrap you app

You just need to:

- 📝 Define your dApp `metadata`
- 🎫 Provide a Wallet Connect [`projectId`](https://docs.walletconnect.com/walletkit/web/cloud/relay#project-id)
- 🔌 Choose your wallet connectors
- 🌯 Wrap your app within `<HWBridgeProvider>`

and you'll be ready to go 👇

```tsx
import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector, KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { HederaTestnet } from '@buidlerlabs/hashgraph-react-wallets/chains'

import DAppLogo from 'src/assets/logo.png'

const metadata = {
  name: 'My awesome dApp',
  description: 'Created using Hashgraph React Wallets',
  icons: [DAppLogo],
  url: window.location.href,
}

const ReactWalletsProvider = ({ children }) => {
  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={'<WALLET_CONNECT_PROJECT_ID>'}
      connectors={[HashpackConnector, KabilaConnector]}
      chains={[HederaTestnet]}
    >
      {children}
    </HWBridgeProvider>
  )
}
```

## Props

### ⏳ LoadingFallback

- **Type**: `JSX.Element`
- **Default**: `<div>Loading...</div>`
- **Description**: display a custom loading screen until the context is initialized

### 📝 metadata

```tsx
import { SignClientTypes } from '@walletconnect/types'
```

- **Type**: `SignClientTypes.Metadata`
- **Required**: `true`
- **Description**: The [`metadata`](https://specs.walletconnect.com/2.0/specs/clients/core/pairing/data-structures#metadata) is used to provide important information about a dApp when interacting with wallets

```ts
interface Metadata {
  name: string
  description: string
  url: string
  icons: string[]
  verifyUrl?: string
  redirect?: {
    native?: string
    universal?: string
  }
}
```

### 🎫 projectId

- **Type**: `string`
- **Required**: `true`
- **Description**: Read on [`Wallet Connect Docs`](https://docs.walletconnect.com/walletkit/web/cloud/relay#project-id)

### 🔌 defaultConnector

- **Type**: `HWBridgeConnector`
- **Required**: `true`
- **Description**: If there are multiple connectors in the provider config, you can specify the default one. This will allow you to use the hooks without passing a specific connector.

```tsx
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const Wallet = () => {
  const { isConnected, connect, disconnect } = useWallet()
  ...
}
```

### 🎯 strategies

- **Type**: `ConnectionStrategy[]`
- **Required**: `false`
- **Default**: [`HWCConnectionStrategy`, `WagmiConnectionStrategy`]
- **Description**: The library comes with 2 built-in strategies:
  - `HWCConnectionStrategy` responsible for interacting with [hedera-wallet-connect](https://github.com/hashgraph/hedera-wallet-connect/)
  - `WagmiConnectionStrategy` responsible for interacting with [wagmi.sh](https://wagmi.sh/)

```tsx
import { ConnectionStrategy } from '@buidlerlabs/hashgraph-react-wallets'
```

Any other connection strategy can be implemented by extending the `ConnectionStrategy` base class.

### 🔌 connectors

- **Type**: `HWBridgeConnector[]`
- **Required**: `true`
- **Description**: A list of wallet connectors to be used on dApp
  - `HWCConnector` (Wallet Connect Modal)
  - `HashpackConnector`
  - `KabilaConnector`
  - `BladeConnector` (does't support Hedera Wallet Connect standard yet)
  - `MagicConnector`
  - `MetamaskConnector`

### 🔗 chains

- **Type**: `Chain[]`
- **Required**: `true`
- **Description**: A list of chain configs. Read more on [viem.sh](https://viem.sh/docs/chains/introduction)

```tsx
export default {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'Hashscan', url: 'https://hashscan.io/testnet' },
  },
}
```

### 🔀 multiSession

- **Type**: `boolean`
- **Required**: `false`
- **Default**: `false`
- **Description**: Allows your dApp to connect multiple wallets at the same time.

::: tip
If this is enabled, you have to specify the desired `connector` whenever you use a hook.

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const Wallet = () => {
  const { data: balance } = useBalance(HashpackConnector) // [!code focus]
  ...
}
```

or

```tsx
import { KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const Wallet = () => {
  const { data: balance } = useBalance(KabilaConnector) // [!code focus]
 ...
}
```

:::

### 🔎 debug

- **Type**: `boolean`
- **Required**: `false`
- **Default**: `false`
- **Description**: Activates detailed logging in the console for development purposes
