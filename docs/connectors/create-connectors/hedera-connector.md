---
outline: deep
---

# New Hedera connector <Badge type="tip" text="Recommended" />

Creating a new Hedera Connector can be simply accomplished by utilizing the `HWCConnector` and create a new class that extends it. This approach ensures that your connector will comply with the Hedera Wallet Connect Standard.

```ts
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import BladeIconWhite from './assets/blade-icon.png'
import BladeIconDark from './assets/blade-icon-dark.png'

class BladeWalletConnector extends HWCConnector {
  constructor(props) {
    super({ ...props, extensionId: 'abogmiocnneedmmepnohnhlijcjpcifd' })

    this._config = {
      icons: {
        white: BladeIconWhite,
        dark: BladeIconDark,
        ...props.config?.icons,
      },
      ...props.config,
    }
  }

  get isExtensionRequired() {
    return true
  }
}

export default BladeWalletConnector
```
