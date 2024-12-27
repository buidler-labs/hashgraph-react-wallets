# Getting Started

Meet Hashgraph React Wallets, a minimalistic library that makes it easier to connect and interact with the <a class="link" href="https://hedera.com/" target="_blank">Hedera</a> network through your UI.

![NPM Version](https://img.shields.io/npm/v/%40buidlerlabs%2Fhashgraph-react-wallets)
![NPM Downloads](https://img.shields.io/npm/dm/%40buidlerlabs%2Fhashgraph-react-wallets)
![GitHub License](https://img.shields.io/github/license/buidler-labs/hashgraph-react-wallets)


## Overview

_How? You might ask_. Easy ... Adapted to the latest Hedera Wallet Connect standard and integrated with [wagmi.sh](https://wagmi.sh/), one of the most popular toolkits for interacting with Ethereum-based applications, we've successfully combined these two core functionalities.

Together with a connection management system, our solution supports developers by simplifying the creation of new dApps and facilitating interaction with network-supported wallets in just a few easy steps.

## Documentation

Full documentation page: [Hashgraph React Wallets - Docs](https://buidler-labs.github.io/hashgraph-react-wallets/)

## Running the demo app

First, you need to rename the `sample.env` file in the `demo` directory and fill in the following values:

```
DEMO_APP_NAME=
DEMO_APP_DESCRIPTION=
DEMO_APP_URL=

DEMO_MAGIC_EMAIL=
DEMO_MAGIC_PUBLIC_API_KEY=

DEMO_WALLET_CONNECT_PROJECT_ID=
```

Then do a `npm i` in `demo` to bring in its dependencies and run `npm run demo` from the top level repo path to start the development server.

## Installation

Simply run the following installation command using your preferred package manager:

```sh
$ npm i @buidlerlabs/hashgraph-react-wallets
```

```sh
$ yarn add @buidlerlabs/hashgraph-react-wallets
```

## Setup Context

The following is a quick code snippet showing the simplicity of using our `HWBridgeProvider` React component. You just need to define your dApp metadata and choose your wallet connectors and you're good to go.

```jsx
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

At this point you have configured the dApp to use [Hashpack](https://www.hashpack.app/) and [Kabila](https://www.kabila.app/wallet) wallets on Hedera Testnet chain, but there are much more configuration options.

## Basic Usage

Next, we're gonna present some code snippets showing the usage of the UI component to do various things:

> [!NOTE]
> Every react component rendered inside `<HWBridgeProvider>` can use our built-in hooks.

##### Connect a wallet:

```jsx
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'

const Wallet = () => {
  const { isConnected, connect, disconnect } = useWallet(HashpackConnector)

  if (isConnected) {
    return <Button onClick={disconnect}>Disconnect</Button>
  }

  return <Button onClick={connect}>Connect</Button>
}
```

##### Or account balance:

```jsx
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

const Wallet = () => {
  const { data: balance } = useBalance()

  return <span>{balance?.formatted ?? '0 ℏ'}</span>
}
```

# Contribution

Want to help make `Hashgraph React Wallets` even better? Whether it’s fixing bugs, adding new features, or sharing ideas, we’d love your contributions! Feel free to open an issue or send a pull request. Let’s build something great together!
