const { Hbar, ContractExecuteTransaction, Client, AccountId, PrivateKey } = require("@hashgraph/sdk");

async function execute() {
  const MY_ACCOUNT_ID = AccountId.fromString("0.0.2167047");
  const MY_PRIVATE_KEY = PrivateKey.fromString(
    "302e020100300506032b657004220420f2f02aa82f593d09426ef8d4e52e6b272c728a40e547ea4747793bcd07cce4a1"
  );

  // Pre-configured client for test network (testnet)
  const client = Client.forTestnet();

  //Set the operator with the account ID and private key
  client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId("0.0.2948268")
    .setGas(100000)
    .setFunction("inc")
    .setMaxTransactionFee(new Hbar(0.75));
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `- Contract function call status: ${contractExecuteRx.status} \n`
  );
}

execute();
