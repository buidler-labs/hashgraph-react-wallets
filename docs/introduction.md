# Getting Started

Meet Hashgraph React Wallets, a minimalistic library that makes it easier to connect and interact with the <a class="link" href="https://hedera.com/" target="_blank">Hedera</a> network through your UI.

## Overview

_How? You might ask_. Easy ... Adapted to the latest Hedera Wallet Connect standard and integrated with [wagmi.sh](https://wagmi.sh/), one of the most popular toolkits for interacting with Ethereum-based applications, we've successfully combined these two core functionalities.

Together with a connection management system, our solution supports developers by simplifying the creation of new dApps and facilitating interaction with network-supported wallets in just a few easy steps.

## Installation

Simply run the following installation command using your preferred package manager.

::: code-group

```sh [npm]
$ npm i @buidlerlabs/hashgraph-react-wallets
```

```sh [pnpm]
$ pnpm add @buidlerlabs/hashgraph-react-wallets
```

```sh [yarn]
$ yarn add @buidlerlabs/hashgraph-react-wallets
```

```sh [yarn (pnp)]
$ yarn add @buidlerlabs/hashgraph-react-wallets
```

```sh [bun]
$ bun add @buidlerlabs/hashgraph-react-wallets
```

:::

## Setup Context

The following is a quick code snippet showing the simplicity of using our HWBridgeProvider React component. You just need to define your dApp metadata and choose your wallet connectors and you're good to go.

```tsx{1-3,7-12,16-23}
import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector, KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { HederaTestnet } from '@buidlerlabs/hashgraph-react-wallets/chains'

import DAppLogo from 'src/assets/logo.png'

const metadata = {
  name: 'My awesome dApp',
  description: 'Created using Hashgraph React Wallets',
  icons: [DAppLogo],
  url: window.location.href,
}

const ReactWalletsProvider = ({ children }) => {
  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={'<WALLET_CONNECT_PROJECT_ID>'}
      connectors={[HashpackConnector, KabilaConnector]}
      chains={[HederaTestnet]}
    >
      {children}
    </HWBridgeProvider>
  )
}
```

At this point you have configured the dApp to use [Hashpack](https://www.hashpack.app/) and [Kabila](https://www.kabila.app/wallet) wallets on Hedera Testnet chain, but there are much more configuration options. Please see [`Configuration` docs](/api-examples)

## Basic Usage

Next, we're gonna present some code snippets showing the usage of the UI component to do various things:
::: tip
Every react component rendered inside `<HWBridgeProvider>` can use our built-in hooks.
:::

##### Connect a wallet:

```tsx{5}
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'

const Wallet = () => {
  const { isConnected, connect, disconnect } = useWallet(HashpackConnector) // Or any other connectors

  if (isConnected) {
    return <Button onClick={disconnect}>Disconnect</Button>
  }

  return <Button onClick={connect}>Connect</Button>
}
```

##### Or account balance:

```tsx{4}
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const Wallet = () => {
  const { data: balance } = useBalance()

  return <span>{balance?.formatted ?? '0 ℏ'}</span>
}
```

## What's Next?

Checkout our [`guides`](/guides/connect-wallet) and discover how to enhance the [`configuration`](/configuration) or use our built-in collection of **React Hooks**
