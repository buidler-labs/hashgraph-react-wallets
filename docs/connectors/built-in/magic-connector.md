# MagicConnector

What happens in this connector is truly magical. Behind the scenes, it uses the following dependencies:

- `magic-sdk`
- `@magic-ext/hedera`
- `@magic-ext/oauth`

But more than that, it has specific implementations for [`MagicProvider`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/MagicConnector/MagicProvider.ts), [`MagicWallet`](https://github.com/buidler-labs/hashgraph-react-wallets/blob/main/src/hWBridge/connectors/MagicConnector/MagicWallet.ts)

::: warning
By utilizing the magic-sdk, this connector requires a Magic [`public key`](https://magic.link/docs/home/quickstart/integration#get-your-magic-publishable-api-key) to function properly.

You can easily add it through the connector config:

```tsx
import { HWBridgeProvider } from "@buidlerlabs/hashgraph-react-wallets";
import {
  KabilaConnector,
  MagicConnector,
} from "@buidlerlabs/hashgraph-react-wallets/connectors";

return (
  <HWBridgeProvider
    ...
    connectors={[
      KabilaConnector,
      [MagicConnector, { publicApiKey: `<YOUR_MAGIC_API_KEY>` }] // [!code focus]
    ]}
  />
)
```

:::

## Connection Method

Can be used in 2 different ways:

#### Auth

Up to 4 login methods:

- `login with credentials`: authenticate a user with their credentials.
- `login with email OTP`: use email one-time codes for authentication, providing users with an easy way to log in using their email addresses.
- `login with magic link`: authenticate a user without a password by sending a 'magic link' to their email address.
- `login with SMS`: use SMS one-time codes for authentication, allowing users to easily log in using their phones.

[Read more on Magic.link](https://magic.link/docs/authentication/overview)

Example using `MagicLoginMethods.LoginWithMagicLink`:

```tsx
import { MagicConnector, LoginModules, MagicLoginMethods } from '@buidlerlabs/hashgraph-react-wallets/connectors'

const MagicWallet = () => {
  const { connect } = useWallet(MagicConnector)

  const handleConnect = async () => {
    try {
      await connect({
        loginModule: LoginModules.Auth,
        method: MagicLoginMethods.LoginWithMagicLink,
        args: { email: '<USER_EMAIL>' },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return <button onClick={handleConnect}>Connect</button>
}
```

---

#### OAuth

You can use OAuth for authentication, enabling users to log in easily with supported social providers.

Applications can be integrated with the following social providers:

- `Google`
- `Facebook`
- `Twitter`
- `Apple`
- `Discord`
- `GitHub`
- `LinkedIn`
- `Twitch`
- `Bitbucket`
- `Microsoft`

## Instance

You can easily access the connector instance by using:

```tsx
import { MagicConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const { connector } = useWallet(MagicConnector) // [!code focus]

  return ...
}
```

## Extras

It also includes a set of pre-defined icons for both white/dark theme:

```ts
this._config = {
  icons: {
    white: MagicIconWhite,
    dark: MagicIconDark,
    ...props.config?.icons,
  },
  ...props.config,
}
```
