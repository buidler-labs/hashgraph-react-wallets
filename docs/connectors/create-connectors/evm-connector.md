---
outline: deep
---

# New EVM connector

When it comes to creating a new EVM connector, things get a little more complicated. Similar to Hedera connectors, this can be accomplished by utilizing the [`EvmConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/EvmConnector.ts) and create a new class that extends it.

::: tip
If you want to integrate a new wagmi connector, you must define it as a static member of the class.

```ts
import { coinbaseWallet } from 'wagmi/connectors'
import { EvmConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'

class MyConnector extends EvmConnector {
  static wagmiConnector = coinbaseWallet
}
```

:::

Following the implementation from [`MetamaskConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/MetamaskConnector/MetamaskConnector.ts) we can define a similar class structure, but adapt it for our needs.

```ts
import { Config } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import MetamaskIconWhite from './assets/metamask-icon.png'
import MetamaskIconDark from './assets/metamask-icon-dark.png'

class CoinbaseConnector extends EvmConnector {
  private readonly _onAutoPairing: (signer: Client | null) => void

  // define the base wagmiConnector our connector should use
  static wagmiConnector = coinbaseWallet

  constructor(props: HWBConnectorProps) {
    super('coinbaseWallet', props)

    // declare the static media assets for your connector
    this._config = {
      icons: {
        white: MetamaskIconWhite,
        dark: MetamaskIconDark,
        ...props.config?.icons,
      },
      ...props.config,
    }

    // should be used based on watchChainId or watchAccount events
    // to update the current HWBridgeSession
    this._onAutoPairing = props.onAutoPairing
  }

  async getConnection(): Promise<Client | null> {
    // check if `isWalletStateAvailable`, then verify if the connector
    // is authorized to connect and based on the wagmi state connections
    // get the latest connected account and return
    // a new client based on that one

    return null
  }

  async newConnection(): Promise<Client | null> {
    try {
      // TODO: check is the wagmi connector is authorized to connect
      // then dispatch a `connect` wagmi action followed
      // by setting the connected chainId, and return the client

      return null
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async checkExtensionPresence(maxAttempts = 3): Promise<boolean> {
    // TODO: check for the injected provider(window.ethereum) and verify
    // if it's coinbase or not, and based on that you can deduce
    // the extension presence

    return false
  }

  isWalletStateAvailable(): boolean {
    // TODO: check the wagmi connections list and return true if there
    // is an active connection for the defined wagmiConnector

    return false
  }

  async wipePairingData(): Promise<boolean> {
    try {
      // unbind any provider events if there's the case
      // then dispatch a `disconnect` wagmi action for the defined wagmi connector
      // and return true if everything went well

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get isExtensionRequired(): boolean {
    // self-explanatory
    return true
  }

  get sdk(): Config {
    // returns the actual wagmi config
    return this._strategy.controller as Config
  }
}

export default CoinbaseConnector
```
