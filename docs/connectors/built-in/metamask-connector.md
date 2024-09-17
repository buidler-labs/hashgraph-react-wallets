# MetamaskConnector

The Metamask connector has a distinct implementation compared to native wallets, making it a derivative of the [`EvmConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/EvmConnector.ts) and based on the [`WagmiConnectionStrategy`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/strategies/WagmiConnectionStrategy.ts).

Behind the scenes, it uses the [`metaMask`](https://wagmi.sh/react/api/connectors/metaMask) connector from the [wagmi.sh](https://wagmi.sh/) library, leveraging it to handle interactions with the browser extension and its states.

## Instance

You can easily access the connector instance by using:

```tsx
import { MetamaskConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { connector } = useWallet(MetamaskConnector) // [!code focus]

  return ...
}
```

## Extras

It also includes a set of pre-defined icons for both white/dark theme:

```ts
this._config = {
  icons: {
    white: MetamaskIconWhite,
    dark: MetamaskIconDark,
    ...props.config?.icons,
  },
  ...props.config,
}
```
