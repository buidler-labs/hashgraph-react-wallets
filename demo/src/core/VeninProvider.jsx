import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import {ApiSession} from "../libs/hashgraph-venin-js";

export const VeninContext = createContext();

const VeninProvider = ({ network, children }) => {
  const { isConnected, signer } = useWallet();
  const [hapiSession, setHapiSession] = useState(null);
  const [processingModal, setProcessingModal] = useState(null);
 
  useEffect(() => {
    const initHapiSession = async () => {
      try {
        window["hedera"] = signer;
        const { session } = await ApiSession.default({
          wallet: { type: "Browser" },
        });
        // console.log({session})
        setHapiSession(session);
      } catch (e) {
        console.error("Cannot initialize the session. Error: ", e);
      }
    };

    if (!isConnected || !signer) {
      window["hedera"] = null;
      return;
    }

    initHapiSession();
  }, [isConnected, signer]);

  const value = useMemo(
    () => ({
      network,
      venin: {
        session: hapiSession
      },
      setProcessingModal,
    }),
    [network, hapiSession]
  );

  return (
    <VeninContext.Provider value={value}>
      {processingModal}
      {children}
    </VeninContext.Provider>
  );
};

export const useVeninContext = () => {
  const context = useContext(VeninContext);

  if (!context) {
    throw new Error(
      "VeninProvider.* This component must be rendered as child of VeninProvider"
    );
  }

  return context;
};

export default VeninProvider;
