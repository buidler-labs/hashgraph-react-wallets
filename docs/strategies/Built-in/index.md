# Built-in Connection Strategies

The connection strategies serve as the driving force behind connectors, defining how they establish or restore connections and how the wallets package and send requests over the wire.

The library provides the following internally built and ready-to-use connection strategies:

- [`HWCConnectionStrategy`](/strategies/built-in/hwc-connection-strategy)
- [`WagmiConnectionStrategy`](/strategies/built-in/wagmi-connection-strategy)

### Not Enough?

You can create your own connection strategy according to your preferences. [Read more](/strategies/create-connection-strategy)
