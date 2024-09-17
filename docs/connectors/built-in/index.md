---
outline: deep
---

# Built-in Connectors

The implementation of these connectors is split in 2 main categories and currently, the library provides the following internally built and ready-to-use connectors:

### - Hedera Connectors

- [`HWCConnector`](/connectors/built-in/hwc-connector) (Wallet Connect Modal)
- [`HashpackConnector`](/connectors/built-in/hashpack-connector)
- [`KabilaConnector`](/connectors/built-in/kabila-connector)
- [`MagicConnector`](/connectors/built-in/magic-connector)

Each item in this list is derived from the [`HederaConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/HederaConnector.ts) class, a base class built on the [`HWCConnectionStrategy`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/strategies/HWCConnectionStrategy.ts) connection strategy, meaning it follows the Hedera Wallet Connect standard.

### - EVM Connectors

- [`MetamaskConnector`](/connectors/built-in/metamask-connector)

While all the connectors in this list are derived from [`EvmConnector`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/EvmConnector.ts) and are based on the [`WagmiConnectionStrategy`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/strategies/WagmiConnectionStrategy.ts)

### Not Enough?
You can create your own connector according to your preferences. [Read more](/connectors/create-connectors)
