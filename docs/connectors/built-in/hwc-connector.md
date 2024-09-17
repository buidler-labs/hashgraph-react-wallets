---
outline: deep
---

# HWCConnector

As we mentioned earlier, `Hashgraph React Wallets` is built on the Hedera Wallet Connect standard, and this connector forms the foundation for all native wallets that are adapted to this standard.

## Connection Method

Unlike connectors derived from this one, it does not require checking if an extension is installed. Instead, when connecting through this connector, the `Wallet Connect Modal` will appear, offering two options:

- connect by scanning the `QR code` using a mobile app.
- select your preferred wallet from the list of wallets provided by `Wallet Connect`.

![WC Modal](/assets/wc_modal.png)

## Instance

You can easily access the connector instance by using:

```tsx
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { connector } = useWallet(HWCConnector) // [!code focus]

  return ...
}
```

## Extras

Includes a set of pre-defined icons for both white/dark theme:

```ts
this._config = {
  icons: {
    white: WalletConnectIconWhite,
    dark: WalletConnectIconDark,
    ...props.config?.icons,
  },
  ...props.config,
}
```
