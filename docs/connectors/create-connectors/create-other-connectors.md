---
outline: deep
---

# New Connector

[`HederaConnector`](/connectors/create-connectors/hedera-connector) and [`EvmConnector`](/connectors/create-connectors/evm-connector) might not always meet all our needs, but there's no need to worry.

By developing [`new connection strategies`](/strategies/create-connection-strategy) that interact with the network through various native wallet SDKs, we can implement a new type of connector that leverages these strategies.

Supposing we already have a new connection strategy of type:

```ts
'MY_CONNECTION_STRATEGY' as ConnectionStrategyType
```

and following the built-in [`HederaConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/HederaConnector.ts) implementation, we can define a new connector and link it to the actual connection strategy:

```ts{2}
export abstract class MyConnector extends BaseConnector {
  static strategy = 'MY_CONNECTION_STRATEGY' as ConnectionStrategyType

  constructor(props: HWBConnectorProps) {
    super(props)
    this._type = ConnectorType.HEDERA
  }
}
```

What's left is to implement the members of the `IConnector` interface. [`See more`](/connectors/create-connectors/)
