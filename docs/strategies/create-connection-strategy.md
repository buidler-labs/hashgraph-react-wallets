---
outline: deep
---

# Create a new connection strategy

## The Cornerstone

The core component of these connection strategies is the [`ConnectionStrategy`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/strategies/ConnectionStrategy.ts), which implements the following interface and is responsible for tracking the following:

- `ConnectionStrategyType`
- `ConnectionController`
- the supported chains
- the current running chain

```ts
interface IStrategy {
  // is initializing the required dependencies (e.g. wagmi config)
  build(chains: Chain[], connectors?: HWBridgeConnector[]): Promise<ConnectionStrategy>

  // is setting the current controller once its built
  setController(controller: ConnectionController): void

  // is setting the supported chains based on <HWBridgeProvider> configuration
  setSupportedChains(chains: Chain[]): void

  // is setting the current chain the strategy is running on
  setChain(chain: Chain): void

  // returns the current strategy type (built-in: WAGMI, HEDERA_WALLET_CONNECT, UNKNOWN)
  get type(): ConnectionStrategyType

  // returns the connection controller
  get controller(): ConnectionController

  // returns the list of the pre-configured chains
  get supportedChains(): Chain[]

  // returns the current chain the strategy is running on
  get chain(): Chain
}
```

## New Strategy

Taking the example from [`HWCConnectionStrategy`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/strategies/HWCConnectionStrategy.ts), we can have our own implementation derived from `ConnectionStrategy` which utilizes a different wallet SDK than the built-in options.

```ts
export class HWCConnectionStrategy extends ConnectionStrategy {
  constructor(public options: HWCConnectionInitOpts) {
    super('MY_CONNECTION_STRATEGY' as ConnectionStrategyType)
  }

  async build(chains: Chain[]): Promise<ConnectionStrategy> {
    const controller = new OtherWalletSDK()

    this.setController(controller)
    this.setSupportedChains(chains)

    return this
  }
}
```

## Usage

In order to use our brand new connection strategy, we need to create a new connector which consumes the actual implementation. [See how to create a new connector](/connectors/create-connectors/create-other-connectors).
