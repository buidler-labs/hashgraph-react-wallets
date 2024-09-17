---
outline: deep
---

# useHWBridge()

Used to get the current instance of the bridge.

## Usage

```tsx
import { useHWBridge } from '@buidlerlabs/hashgraph-react-wallets'

const App = () => {
  const hwBridge = useHWBridge()

  // do stuff...

  return ...
}
```

## Return Type

```tsx
type InstanceType<typeof HWBridge>;
```
