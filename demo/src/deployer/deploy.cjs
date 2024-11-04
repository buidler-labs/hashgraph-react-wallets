const fs = require("fs");
const {
  FileCreateTransaction,
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  ContractCreateTransaction,
  ContractFunctionParameters,
} = require("@hashgraph/sdk");

async function deploy() {
  const MY_ACCOUNT_ID = AccountId.fromString("0.0.2167047");
  const MY_PRIVATE_KEY = PrivateKey.fromString(
    "302e020100300506032b657004220420f2f02aa82f593d09426ef8d4e52e6b272c728a40e547ea4747793bcd07cce4a1"
  );

  // Pre-configured client for test network (testnet)
  const client = Client.forTestnet();

  //Set the operator with the account ID and private key
  client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

  // Import the compiled contract bytecode
  const contractBytecode = fs.readFileSync(
    "./src/contracts/Whitelist_sol_Whitelist.bin"
  );

  // Create a file on Hedera and store the bytecode
  const fileCreateTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .setKeys([MY_PRIVATE_KEY])
    .setMaxTransactionFee(new Hbar(2))
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(MY_PRIVATE_KEY);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

  // Instantiate the smart contract
  const contractInstantiateTx = new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setConstructorParameters(new ContractFunctionParameters().addString("Hello world!"))
    .setGas(200_000);
  const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
    client
  );
  const contractId = contractInstantiateRx.contractId;
  const contractAddress = contractId.toSolidityAddress();
  console.log(`- The smart contract ID is: ${contractId} \n`);
  console.log(`- Smart contract ID in Solidity format: ${contractAddress} \n`);
}

deploy();
