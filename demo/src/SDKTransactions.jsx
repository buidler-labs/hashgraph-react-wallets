import React from "react";
import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import { TokenAssociateTransaction } from "@hashgraph/sdk";

const SDKTransactions = () => {
  const { signer } = useWallet();

  const handleAssociate = async (tokens) => {
    if (!signer) {
      throw new Error("Signer is required");
    }

    const transaction = await new TokenAssociateTransaction()
      .setAccountId(signer.getAccountId())
      .setTokenIds(tokens)
      .freezeWithSigner(signer);

    //@ts-ignore
    const txResponse = await transaction.executeWithSigner(signer);

    console.log(txResponse);
  };

  return (
    <div>
      <div>SDK Transactions</div>
      <div>
        <button onClick={() => handleAssociate(["0.0.2952830"])}>
          associate
        </button>
      </div>
    </div>
  );
};

export default SDKTransactions;
