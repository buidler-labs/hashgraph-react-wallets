import {
  useAccountId,
  useBalance,
  useHNS,
  useTokensBalance,
  useChain,
  useSwitchChain,
  useWallet,
  useEvmAddress,
} from "@buidlerlabs/hashgraph-react-wallets";
import Authentication from "./Authentication";
import ContractsBenchmark from "./ContractsBenchmark";
import ChainSwitcher from "./ChainSwitcher";
import TokensBenchmark from "./TokensBenchmark";
import WalletBtn from "./WalletBtn";
import {
  HWCConnector,
  HashpackConnector,
  KabilaConnector,
  BladeConnector,
  MetamaskConnector,
  MagicConnector
} from "@buidlerlabs/hashgraph-react-wallets/connectors";
import SDKTransactions from "./SDKTransactions";
import StakingTest from "./StakingTest";
import { Fragment } from "react";

const Workbench = () => {
  const wallet = useWallet();
  console.log(wallet);
  
  const { isConnected } = wallet;
  const { data: accountId } = useAccountId();
  const { data: evmAddress } = useEvmAddress();
  const { data: balance } = useBalance();
  const { data: hns } = useHNS();
  const { data: ownedTokens, isLoading: isLoadingTokens } = useTokensBalance({
    accountId: "0.0.1990009",
    autoFetch: !!accountId,
  });

  console.log(ownedTokens);

  const { data: chainData } = useChain();
  const { switchChain } = useSwitchChain();

  return (
    <div>
      <span>Hedera </span>
      <ChainSwitcher />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>
            Dapp ChainId:{" "}
            {chainData?.error
              ? chainData.error
              : chainData?.chain?.id || "Unsupported"}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              Hedera Network:{" "}
              {chainData?.error ? (
                <span style={{ color: "red" }}>{chainData.error}</span>
              ) : (
                chainData?.chain?.name || "Unknown"
              )}
            </div>
            {chainData?.error && (
              <button onClick={() => switchChain(296)}>Switch</button>
            )}
          </div>
          <div>AccountId: {accountId || "Not connected"}</div>
          <div>EVM Address: {evmAddress || "Not connected"}</div>
          <div>Hns: {hns?.hnsName || "N/A"}</div>
          <div>Balance: {balance?.formatted || "Not connected"}</div>

          <br />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "1rem",
              maxWidth: "20rem",
            }}
          >
            <WalletBtn name="WalletConnect" Connector={HWCConnector} />
            <WalletBtn name="Hashpack" Connector={HashpackConnector} />
            <WalletBtn name="Kabila" Connector={KabilaConnector} />
            <WalletBtn name="Blade" Connector={BladeConnector} />
            <WalletBtn name="Metamask" Connector={MetamaskConnector} />
            <WalletBtn name="Magic OTP" Connector={MagicConnector} isMagic={true}/>
          </div>
        </div>
        <div style={{ flex: 1, maxHeight: "20rem", overflowY: "auto" }}>
          <div>Owned tokens:</div>
          {isLoadingTokens ? (
            "Fetching..."
          ) : ownedTokens?.length > 0 ? (
            <ul>
              {ownedTokens.map(({ token_id, balance }) => (
                <li key={token_id}>
                  <span>{token_id}</span> - <span>{balance}</span>
                </li>
              ))}
            </ul>
          ) : (
            "Nothing to show"
          )}
        </div>
      </div>
      <br />

      <br />
      <hr />

      <Authentication />

      <hr />
      <br />

      <ContractsBenchmark />

      <br />
      <hr />
      <br />

      <TokensBenchmark />

      <br />
      <hr />

      <SDKTransactions />

      {isConnected && (
        <Fragment>
          <br />
          <hr />

          <StakingTest />
        </Fragment>
      )}
    </div>
  );
};

export default Workbench;
