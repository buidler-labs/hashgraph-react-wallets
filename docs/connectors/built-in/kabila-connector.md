---
outline: deep
---

# KabilaConnector

This connector follows the `Hedera Wallet Connect standard` as a derivative of the [`HWConnector`](/connectors/built-in/hwc-connector), with the main differences being the connection mode and additional specific configurations for the `Kabila` wallet.

## Connection Method

The connection method relies directly on interaction with the browser extension, identified by its unique ID (`cnoepnljjcacmnjnopbhjelpmfokpijm`).

## Instance

You can easily access the connector instance by using:

```tsx
import { KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { connector } = useWallet(KabilaConnector) // [!code focus]

  return ...
}
```

## Extras

It also includes a set of pre-defined icons for both white/dark theme:

```ts
this._config = {
  icons: {
    white: KabilaIconWhite,
    dark: KabilaIconDark,
    ...props.config?.icons,
  },
  ...props.config,
}
```
