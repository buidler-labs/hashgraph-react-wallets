import {
  useAssociateTokens,
  useBalance,
  useTokensBalance,
  useWallet,
  useWatchTransactionReceipt,
} from "@buidlerlabs/hashgraph-react-wallets";
import { useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const AssociateTokens = () => {
  const [tokens, setTokens] = useState("0.0.2952830");
  const [loading, setLoading] = useState(false);
  const { isConnected } = useWallet();
  const { associateTokens } = useAssociateTokens();
  const { watch } = useWatchTransactionReceipt();
  const { refetch: updateBalance } = useBalance();
  const { refetch: updateTokensBalance } = useTokensBalance();

  const handleAssociateTokens = async () => {
    try {
      const toAssociate = tokens.split(",");

      setLoading(true);
      const hashOrTransactionId = await associateTokens(toAssociate);
      console.log({ hashOrTransactionId });

      watch(hashOrTransactionId, {
        onSuccess: (transaction) => {
          console.log(transaction);

          const label = (
            <div>
              <div>SUCCESS: </div>
              <a
                href={`https://hashscan.io/testnet/transaction/${transaction.consensus_timestamp}`}
                target="_blank"
              >
                https://hashscan.io/testnet/transaction/
                {transaction.consensus_timestamp}
              </a>
            </div>
          );

          toast.success(label, {
            icon: "✅",
            style: { maxWidth: "unset" },
          });

          updateBalance();
          updateTokensBalance();
          setLoading(false);

          return transaction;
        },
        onError: (transaction) => {
          console.log(transaction);

          const label = (
            <div>
              <div>FAILED: {transaction.result}</div>
              <a
                href={`https://hashscan.io/testnet/transaction/${transaction.consensus_timestamp}`}
                target="_blank"
              >
                https://hashscan.io/testnet/transaction/
                {transaction.consensus_timestamp}
              </a>
            </div>
          );

          toast.error(label, {
            icon: "❌",
            style: { maxWidth: "unset" },
          });

          updateBalance();
          updateTokensBalance();
          setLoading(false);

          return transaction;
        },
      });
    } catch (e) {
      const jError = JSON.parse(JSON.stringify(e));
      console.log(jError);
      
      toast.error(jError.shortMessage || jError.status, {
        icon: "❌",
        style: { maxWidth: "unset" },
      });

      updateBalance();
      updateTokensBalance();
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <div>Associate</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          placeholder="0.0.134,0.0.1245"
        />
        <button onClick={handleAssociateTokens} disabled={!isConnected}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span>Associate</span>
            {loading && <PulseLoader size={10} />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AssociateTokens;
