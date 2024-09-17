# HWC Connection Strategy

Driven by `@hashgraph/hedera-wallet-connect` this strategy enables the native wallets connections on the chain on the premise that they support the `Hedera Wallet Connect standard`.

The implementation is straightforward, as its main responsibility is to initialize a [`DAppConnector`](https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/lib/dapp/index.ts) instance from `@hashgraph/hedera-wallet-connect`, using the necessary configurations for interaction with the chain.

::: info
It requires a `projectId` that needs to be configured on `<HWBridgeProvider>`. Read more about the [`configuration`](/configuration.html#%F0%9F%8E%AB-projectid)
:::

### Not Enough?

You can create your own connection strategy according to your preferences. [Read more](/strategies/create-connection-strategy)

