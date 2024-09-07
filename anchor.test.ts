// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
  it("enroll", async () => {
    // Generate keypair for the new account
    const newAccountKp = new web3.Keypair();

    // Send transaction
    const data = new BN(80);
    const txHash = await pg.program.methods
      .enroll("CJ", "Joseph")
      .accounts({
        enrollment: newAccountKp.publicKey,
        signer: pg.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([newAccountKp])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const enrollment = await pg.program.account.enrollment.fetch(
      newAccountKp.publicKey
    );

    console.log("On-chain data is:", enrollment.firstName.toString());
    console.log("On-chain data is:", enrollment.lastName.toString());

    // Check whether the data on-chain is equal to local 'data'
    //assert(data.eq(newAccountKp.data));
  });
});

/*
Transaction 1: 3GF2vq3QDxoNfmQZ3vvbqTujoZXMZuV47mtqqaeuz111bbb4PnHhRCY36s1j91JCCw7uY5AV9NurzzgbM6qUKpjb
Transaction 2: 51bJwMapea1FX5UTULkCAeTLmVhLDNu1jzTKGvHGiD73c9Lgzxy1s1VfcGoYWbNentKe5r3iQRLT591Af6cUdNfB
Transaction 3:  565F9sRBGokLbDoe88dhd2eULMDU5fV25F8c8SNfFgbhDs3GvJNz4PTKA2Y5AiWZPNBS6C7K6zLA53N38kfN7Bdu

AVhi6aUWRwRnAkC3PgmEviFctYErZPoAuVwSy3mutkUf
*/

/*
T1: 2EAvjEBQCpGn8PtFCVZErdNskEEseucZy6UznbTEtLqgU9UMmsx8C9XLFXrS9ynCtSNzuUTscQZcVYKUbT9DyHDQ
T2: wSMLfAHWztNboayNFMK7KZFykakCC327tXD4YFzyVMn4qrZ7VhScvjM6dVQzuKdSrGc3QML6Y3j35tZA1aHyBHf
T3: 28jzM5j5PEhVte23B1Jv2Y8ujZKDJbVk8zKGGnNDrhWRFENNuLmhPcQtjyzar4qjVEcCzQ8vyi4Ck7G5czeikmRy

*/
