import {
  HWBridgeProvider,
  useHWBridge,
} from "@buidlerlabs/hashgraph-react-wallets";
import {
  HWCConnector,
  HashpackConnector,
  KabilaConnector,
  BladeConnector,
  MetamaskConnector,
  MagicConnector,
} from "@buidlerlabs/hashgraph-react-wallets/connectors";
import {
  HederaMainnet,
  HederaTestnet,
} from "@buidlerlabs/hashgraph-react-wallets/chains";
import { HashpackHNSResolver } from "@buidlerlabs/hashgraph-react-wallets/hns-resolvers";
import Logo from "./assets/react.svg";
import Workbench from "./Workbench";
import VeninProvider from "./core/VeninProvider";
import { Toaster } from "react-hot-toast";

const HEDERA_NETWORK = "mainnet";

const metadata = {
  name: import.meta.env.DEMO_APP_NAME,
  description: import.meta.env.DEMO_APP_DESCRIPTION,
  icons: [Logo],
  url: new URL(import.meta.env.DEMO_APP_URL),
};

const LoadingSpinner = () => {
  return "My custom loading...";
};

const App = () => {
  return (
    <HWBridgeProvider
      LoadingFallback={LoadingSpinner}
      metadata={metadata}
      projectId={import.meta.env.DEMO_WALLET_CONNECT_PROJECT_ID}
      connectors={[
        HWCConnector,
        HashpackConnector,
        KabilaConnector,
        BladeConnector,
        MetamaskConnector,
        [MagicConnector, {publicApiKey: import.meta.env.DEMO_MAGIC_PUBLIC_API_KEY}]
      ]}
      chains={[HederaTestnet, HederaMainnet]}
      multiSession={false}
      debug={false}
    >
      <AppContent>
        <VeninProvider network={HEDERA_NETWORK}>
          <Workbench />
          <Toaster />
        </VeninProvider>
      </AppContent>
    </HWBridgeProvider>
  );
};

const AppContent = ({ children }) => {
  const bridge = useHWBridge();

  return bridge?.isInitialized ? children : <div>Loading...</div>;
};

export default App;
