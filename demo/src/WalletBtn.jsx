import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import {
  MagicLoginMethods,
  LoginModules,
} from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { Fragment } from "react";
import toast from "react-hot-toast";

const WalletBtn = ({ name, Connector, isMagic }) => {
  const {
    isExtensionRequired,
    extensionReady,
    isConnected,
    connect,
    disconnect,
    connector,
  } = useWallet(Connector) || {};

  const handleConnect = async () => {
    try {
      if (isMagic) {
        await connect({
          loginModule: LoginModules.Auth,
          method: MagicLoginMethods.LoginWithMagicLink,
          args: { email: import.meta.env.DEMO_MAGIC_EMAIL },
        });
      } else {
        await connect();
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message || "Something went wrong", {
        icon: "❌",
        style: { maxWidth: "unset" },
      });
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: `${
                isExtensionRequired && !extensionReady ? "#dedede" : "orange"
              }`,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: `${isConnected ? "green" : "#dedede"}`,
            }}
          />
          {connector?.config?.icons?.dark ? (
            <img
              style={{ maxWidth: "1rem" }}
              src={connector?.config?.icons?.dark}
            />
          ) : null}
          <div>{name}</div>
        </div>
        {isConnected ? (
          <button onClick={disconnect}>Disconnect</button>
        ) : isExtensionRequired && !extensionReady ? (
          <button>Install</button>
        ) : (
          <button onClick={handleConnect}>Connect</button>
        )}
      </div>
    </Fragment>
  );
};

export default WalletBtn;
