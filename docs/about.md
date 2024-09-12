# About

## The idea

The development of the **Hashgraph React Wallets** library gained momentum with Hedera's network adaptation to become EVM-compatible.

Here at [BuidlerLabs](https://buidlerlabs.com/), we’ve been focused on finding the optimal solution to integrate functionalities from various supported wallets on the chain and to easily manage their connection states.

The wallet connection states are managed through predefined **connectors**, each tailored to handle specific tasks for its respective wallet.

Currently, the library provides the following internally built and ready-to-use connectors:

- `HWCConnector` (Wallet Connect Modal)
- `HashpackConnector`
- `KabilaConnector`
- `MagicConnector`
- `MetamaskConnector`

## History

Initially, **Hashgraph React Wallets** started by using the specific SDKs for each Hedera native wallet, such as `hashconnect` and `blade-web3.js`, going through several stages of improvement until adopting the **Hedera Wallet Connect standard**.

## Present

By leveraging the **Hedera Wallet Connect** standard and [wagmi.sh](https://wagmi.sh/), we've enhanced the library's scalability by offering the ability to configure custom connectors, making it easier to integrate new wallets.

## Developer Experience

Think of it like a box of LEGO, where you can grab the pieces and build a model in just a few minutes. In the same way, **Hashgraph React Wallets** works by providing a collection of **React Hooks** designed to perform specific tasks on the **Hedera** network.

It takes no more than 10 minutes to install the library, configure it, and with just a few lines of code, you’ll have a solid foundation for a decentralized application on Hedera.
