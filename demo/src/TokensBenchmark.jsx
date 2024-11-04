import AssociateTokens from "./AssociateTokens";
import TokenAllowance from "./TokenAllowance";
import TokenNFTAllowance from "./TokenNFTAllowance";

const TokensBenchmark = () => {
  return (
    <div>
      <div>Tokens:</div>
      <br />
      <AssociateTokens />
      <br />
      <TokenAllowance />
      <br/>
      <TokenNFTAllowance/>
    </div>
  );
};

export default TokensBenchmark;
