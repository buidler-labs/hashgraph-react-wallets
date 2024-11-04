import {
  ConnectorType,
  useApproveTokenAllowance,
  useWatchTransactionReceipt,
  useWriteContract,
} from "@buidlerlabs/hashgraph-react-wallets";
import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import { ContractId } from "@hashgraph/sdk";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

const contractId = ContractId.fromString("0.0.4569324");

const StakingTest = () => {
  const { signer } = useWallet();
  const { approve: approveAllowance } = useApproveTokenAllowance();
  const [stakeAmount, setStakeAmount] = useState(0);

  const { watch } = useWatchTransactionReceipt({
    abi: stakingABI,
  });

  const { writeContract } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const onSubmitted = (hashOrTransactionId) => {
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
          duration: 6000,
        });

        setLoading(false);
        return transaction;
      },
      onError: (transaction, error) => {
        const errorMessage =
          error?.errorName && error?.abiItem
            ? error.errorName
            : transaction.result;

        const label = (
          <div>
            <div>FAILED: {errorMessage}</div>
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
          duration: 6000,
        });

        setLoading(false);
        return transaction;
      },
    });
  };

  const handleApproveAllowance = async () => {
    if (!signer) {
      throw new Error("Signer is required");
    }

    const allowanceResponse = await approveAllowance(
      [{ tokenId: "0.0.4383272", amount: 1000 * Math.pow(10, 8) }],
      contractId
    );

    console.log({ allowanceResponse });
  };

  const handleStake = async () => {
    if (!signer) {
      throw new Error("Signer is required");
    }
    try {
      setLoading(true);

      const transactionReceiptOrHash = await writeContract({
        contractId,
        abi: stakingABI,
        functionName: "stake",
        metaArgs: {
          gas: 500_000,
        },
        args: [0, Number(stakeAmount) * Math.pow(10, 8)],
      });

      if (
        transactionReceiptOrHash &&
        typeof transactionReceiptOrHash === "string"
      ) {
        onSubmitted(transactionReceiptOrHash);
      }
    } catch (e) {
      console.log(JSON.parse(JSON.stringify(e)));

      if (e.transactionId) {
        const [account, consensusTimestamp] = e.transactionId
          .toString()
          .split("@");

        onSubmitted(`${account}-${consensusTimestamp.replace(".", "-")}`);
      }

      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>Staking test</div>
      <div>
        <input
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
        <button onClick={handleApproveAllowance}>Approve allowance</button>
        <button onClick={handleStake}>Staking Test</button>
      </div>
      {loading && <PulseLoader size={10} />}
    </div>
  );
};

export default StakingTest;

const stakingABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hstToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxMultiplier",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "HardCapReached",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientRewardBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidArrayLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEndDate",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidLockPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidNFTCollection",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTokenId",
    type: "error",
  },
  {
    inputs: [],
    name: "LockPeriodNotOver",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxMultiplierReached",
    type: "error",
  },
  {
    inputs: [],
    name: "NFTDepositFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "NFTWithdrawFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "NoNFTBoostApplied",
    type: "error",
  },
  {
    inputs: [],
    name: "NoNFTOwned",
    type: "error",
  },
  {
    inputs: [],
    name: "NoPenalizedTokens",
    type: "error",
  },
  {
    inputs: [],
    name: "NoRewardAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "NoWithdrawableAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "PenaltyRateTooHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolEnded",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolNotStarted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenAssociationFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "msg",
        type: "string",
      },
    ],
    name: "ZeroAmount1",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "penaltyAmount",
        type: "uint256",
      },
    ],
    name: "EmergencyWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "boost",
        type: "uint256",
      },
    ],
    name: "NFTBoostSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalBost",
        type: "uint256",
      },
    ],
    name: "NFTDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalBost",
        type: "uint256",
      },
    ],
    name: "NFTWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PenalizedTokensWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "apy",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lockPeriodInDays",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "hardCap",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "penaltyRate",
        type: "uint256",
      },
    ],
    name: "PoolAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accRewardPerShare",
        type: "uint256",
      },
    ],
    name: "PoolUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "RewardPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardReinvested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_principal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "accrueInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_apy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lockPeriodInDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_hardCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_penaltyRate",
        type: "uint256",
      },
    ],
    name: "addPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "associateToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "depositNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getPendingReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getStake",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalMultiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "depositTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastInteractionTime",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "nftCollections",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "nftCounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[][]",
        name: "nftTokenIds",
        type: "uint256[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getTotalMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hstToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "boost",
        type: "uint256",
      },
    ],
    name: "initializeNFTBoost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nftBoosts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "apy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lockPeriodInDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "hardCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdateTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "penaltyRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "reinvest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxMultiplier",
        type: "uint256",
      },
    ],
    name: "setMaxMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "boost",
        type: "uint256",
      },
    ],
    name: "setNFTBoost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPenalizedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userStakes",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalMultiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "depositTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastInteractionTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "withdrawNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawPenalizedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rateWad",
        type: "uint256",
      },
    ],
    name: "yearlyRateToRay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
