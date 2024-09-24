# WAGMI Connection Strategy

Similar to the [`HWCConnectionStrategy`](/strategies/hwc-connection-strategy), this connection strategy enables interaction with the chain via [`wagmi`](https://wagmi.sh/) through `JSON-RPC`.

The core responsibility of this strategy is to initialize a `wagmi` configuration, derived from the primary config of `<HWBridgeProvider>` ([`chains`](/configuration.html#🔗-chains)/[`connectors`](/configuration.html#🔌-connectors)), which will subsequently be used for executing actions on the chain.