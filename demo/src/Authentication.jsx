import React, { useState } from "react";
import { useAuthSignature, UserRefusedToSignAuthError } from "@buidlerlabs/hashgraph-react-wallets";

const Authentication = () => {
  const { signAuth } = useAuthSignature();
  const messageToAuthenticate = "Alupigus";
  let [signature, setSignature] = useState("");

  const handleAuthenticate = async () => {
    //@ts-ignore
    try {
      const signerSignature = await signAuth(messageToAuthenticate);

      setSignature(JSON.stringify(signerSignature));
    } catch (e) {
      if (e instanceof UserRefusedToSignAuthError) {
        setSignature("User refused to sign");
      } else {
        setSignature(e);
      }
    }
  };

  return (
    <div>
      <div>Authenticate message <b>{messageToAuthenticate}</b></div>
      <div>
        <button onClick={() => handleAuthenticate()}>
          authenticate
        </button>
      </div>
      {signature && <div>{signature}</div> }
    </div>
  );
};

export default Authentication;
