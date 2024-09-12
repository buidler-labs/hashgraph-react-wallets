import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        text: 'Hooks',
        link: '/hooks',
        items: [
          { text: 'useWallet', link: '/hooks/use-wallet' },
          { text: 'useAccountId', link: '/hooks/use-account-id' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/buidler-labs/hashgraph-react-wallets' },
      { icon: 'twitter', link: 'https://twitter.com/BuilderLabs' },
    ],

    footer: {
      message: 'Made with love ❤️ by <a href="https://buidlerlabs.com/" target="_blank">Buidler-labs Team</a>',
      copyright: 'Copyright © 2024-present',
    },
  },
  ignoreDeadLinks: true,
  base: '/hashgraph-react-wallets/'
})
