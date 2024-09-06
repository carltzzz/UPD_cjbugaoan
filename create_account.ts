import {
    clusterApiUrl,
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";
  import bs58 from "bs58";
  
  (async () => {
    const CONNECTION = new Connection(clusterApiUrl("devnet"));
  
    const PRIVATE_KEY =
      "4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP";
    const decoded = bs58.decode(PRIVATE_KEY);
  
    const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
  
    const tx = new Transaction();
    const NEW_ACCOUNT_KEYPAIR = Keypair.generate();
    const lamports = await CONNECTION.getMinimumBalanceForRentExemption(0);
  
    tx.instructions = [
      SystemProgram.createAccount({
        fromPubkey: MY_KEYPAIR.publicKey,
        newAccountPubkey: NEW_ACCOUNT_KEYPAIR.publicKey,
        lamports,
        space: 0,
        programId: SystemProgram.programId,
      }),
    ];
  
    const txHash = await CONNECTION.sendTransaction(tx, [
      MY_KEYPAIR,
      NEW_ACCOUNT_KEYPAIR,
    ]);
  
    console.log(txHash);
  
    // 1. Get keypair (public key and private Key)
    // 2. Create Transaction
    // 3. Signing transaction
    // 4. Sending Transaction
  })();