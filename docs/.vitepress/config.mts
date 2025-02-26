import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/hashgraph-react-wallets/favicon.ico' }]],
  title: 'Hashgraph React Wallets',
  description:
    'A lightweight library that aims to provide an easier way to interact with the hedera network from a UI perspective',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/introduction' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Getting Started', link: '/introduction' },
          { text: 'Configuration', link: '/configuration' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Connect a Wallet', link: '/guides/connect-wallet' },
          {
            text: 'Execute transactions',
            link: '/guides/execute-transactions',
          },
        ],
      },
      {
        text: 'Strategies',
        items: [
          {
            text: 'Built-in',
            link: '/strategies/built-in',
            items: [
              { text: 'HWCConnectionStrategy', link: '/strategies/built-in/hwc-connection-strategy' },
              { text: 'WagmiConnectionStrategy', link: '/strategies/built-in/wagmi-connection-strategy' },
            ],
          },
          {
            text: 'Create strategies',
            link: '/strategies/create-connection-strategy',
          },
        ],
      },
      {
        text: 'Connectors',
        items: [
          {
            text: 'Built-in',
            link: '/connectors/built-in',
            items: [
              { text: 'HWCConnector', link: '/connectors/built-in/hwc-connector' },
              { text: 'HashpackConnector', link: '/connectors/built-in/hashpack-connector' },
              { text: 'KabilaConnector', link: '/connectors/built-in/kabila-connector' },
              { text: 'MagicConnector', link: '/connectors/built-in/magic-connector' },
              { text: 'MetamaskConnector', link: '/connectors/built-in/metamask-connector' },
            ],
          },
          {
            text: 'Create connectors',
            link: '/connectors/create-connectors',
            items: [
              { text: 'Native Connector', link: '/connectors/create-connectors/hedera-connector' },
              { text: 'EVM Connector', link: '/connectors/create-connectors/evm-connector' },
              { text: 'Other Connectors', link: '/connectors/create-connectors/create-other-connectors' },
            ],
          },
        ],
      },
      {
        text: 'Hooks',
        link: '/hooks',
        items: [
          { text: 'useWallet', link: '/hooks/use-wallet' },
          { text: 'useAccountId', link: '/hooks/use-account-id' },
          { text: 'useAccountInfo', link: '/hooks/use-account-info' },
          { text: 'useApproveTokenAllowance', link: '/hooks/use-approve-token-allowance' },
          { text: 'useApproveTokenNftAllowance', link: '/hooks/use-approve-token-nft-allowance' },
          { text: 'useAssociateTokens', link: '/hooks/use-associate-tokens' },
          { text: 'useAuthSignature', link: '/hooks/use-auth-signature' },
          { text: 'useBalance', link: '/hooks/use-balance' },
          { text: 'useChain', link: '/hooks/use-chain' },
          { text: 'useConnectedWallets', link: '/hooks/use-connected-wallets' },
          { text: 'useContract', link: '/hooks/use-contract' },
          { text: 'useEvmAddress', link: '/hooks/use-evm-address' },
          { text: 'useHNS', link: '/hooks/use-hns' },
          { text: 'useHWBridge', link: '/hooks/use-hw-bridge' },
          { text: 'useScheduledMaintenances', link: '/hooks/use-scheduled-maintenances' },
          { text: 'useReadContract', link: '/hooks/use-read-contract' },
          { text: 'useSwitchChain', link: '/hooks/use-switch-chain' },
          { text: 'useTokensBalance', link: '/hooks/use-tokens-balance' },
          { text: 'useWatchTransactionReceipt', link: '/hooks/use-watch-transaction-receipt' },
          { text: 'useWriteContract', link: '/hooks/use-write-contract' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/buidler-labs/hashgraph-react-wallets' },
      { icon: 'twitter', link: 'https://twitter.com/BuilderLabs' },
    ],

    footer: {
      message: 'Made with love ❤️ by <a href="https://buidlerlabs.com/" target="_blank">Buidler-labs Team</a>',
      copyright: 'Copyright © 2024-present',
    },
  },
  lastUpdated: true,
  ignoreDeadLinks: true,
  base: '/hashgraph-react-wallets/',
})
