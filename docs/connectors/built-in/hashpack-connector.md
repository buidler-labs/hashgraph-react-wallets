---
outline: deep
---

# HashpackConnector

This connector follows the `Hedera Wallet Connect standard` as a derivative of the [`HWConnector`](/connectors/built-in/hwc-connector), with the main differences being the connection mode and additional specific configurations for the `Hashpack` wallet.

## Connection Method

The connection method relies directly on interaction with the browser extension, identified by its unique ID (`gjagmgiddbbciopjhllkdnddhcglnemk`).

## Instance

You can easily access the connector instance by using:

```tsx
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { connector } = useWallet(HashpackConnector) // [!code focus]

  return ...
}
```

## Extras

Overrides `resolveHNS` function and uses its own HNS resolver based on [`hashpack user profiles`](https://docs.hashpack.app/dapp-developers/user-profiles).

It also includes a set of pre-defined icons for both white/dark theme:

```ts
this._config = {
  icons: {
    white: HashpackIconWhite,
    dark: HashpackIconDark,
    ...props.config?.icons,
  },
  ...props.config,
}
```
