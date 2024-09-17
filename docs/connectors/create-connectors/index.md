---
outline: deep
---

# Create New Connectors

## The Cornerstone

The core component of these connectors is the [`BaseConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/BaseConnector.ts), which implements the following interface and is responsible of keeping the connector config and the connection strategy.

```tsx
interface IConnector {
  // get and establish the connection if there's an active session found
  getConnection(): void

  // establish a new connection based on the connector config
  newConnection(props?: ConnectionConfig): void

  // checks the extension presence for the connectors that require this
  checkExtensionPresence(): Promise<boolean>

  // checks if there is any caching keys and determine the connection availability
  isWalletStateAvailable(): Promise<boolean> | boolean

  // terminate an active connection and wipes caching data
  wipePairingData(): Promise<boolean>

  // gets the HNS info based on the connector's `hnsResolver`
  resolveHNS(accountId: string): Promise<HNSResult | null>

  // returns the connector type
  get type(): ConnectorType

  // checks if the extension is required based on connector config
  get isExtensionRequired(): boolean

  // returns the connector sdk (DAppConnector/Wagmi Config)
  get sdk(): any

  // returns the connector config
  get config(): ConnectorConfig

  // returns the current chain
  get chain(): Chain
}
```

By default it is treated as a Hedera native connector, is defaulting some of the properties such as: `checkExtensionPresence`, `isWalletStateAvailable` and `isExtensionRequired`

Let's consider this implementation as the cornerstone for developing a new connector.

## The Split

Next, there are two derivatives of this foundational piece that categorize the connectors into different types:

### `HederaConnector` ([source](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/HederaConnector.ts)) <Badge type="tip" text="Recommended" />

- Is setting the connection strategy as `HWCConnectionStrategy`
- Is keeping the connector type as `HEDERA` type

::: tip
Learn how to create your own **Hedera Connector** [`here`](/connectors/create-connectors/hedera-connector)
:::

### `EvmConnector` ([source](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/EvmConnector.ts))

- Is setting the connection strategy as `WagmiConnectionStrategy`
- Is keeping the connector type as `ETHEREUM` type
- Is keeping the evidence of the current connected connector from wagmi `Config`

::: tip
Learn how to create your own **EVM Connector** [`here`](/connectors/create-connectors/evm-connector)
:::

### `OtherConnector`

[Read more](/connectors/create-connectors/create-other-connectors) how to create your own connector which consumes a custom connection strategy.
