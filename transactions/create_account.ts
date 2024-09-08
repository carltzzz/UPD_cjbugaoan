import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
    const CONNECTION = new Connection(clusterApiUrl("devnet"));
    const { lastValidBlockHeight, blockhash} = await CONNECTION.getLatestBlockhash();


    const PRIVATE_KEY = "4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP";
    const decoded = bs58.decode(PRIVATE_KEY);

    const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
    const NEW_ACCOUNT_KEYPAIR = Keypair.generate();

    const tx = new Transaction();  
    const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(0);

    tx.instructions = [
        SystemProgram.createAccount({
            fromPubkey: MY_KEYPAIR.publicKey,
            newAccountPubkey: NEW_ACCOUNT_KEYPAIR.publicKey,
            lamports: minimumRent,
            space: 0,
            programId: SystemProgram.programId,
        }),
    ];
    
    tx.feePayer = MY_KEYPAIR.publicKey;
    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.sign(MY_KEYPAIR, NEW_ACCOUNT_KEYPAIR);


    const serialized = tx.serialize();
    const txHash = await CONNECTION.sendRawTransaction(serialized);
    // CONNECTION.sendRawTransaction;
    // const txHash = await CONNECTION.sendTransaction(tx, [
    //     MY_KEYPAIR, NEW_ACCOUNT_KEYPAIR,
    // ]);

    console.log(txHash);
    }
)();
