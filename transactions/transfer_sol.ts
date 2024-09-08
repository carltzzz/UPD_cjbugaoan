import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
    const PRIVATE_KEY = "4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP"
    const CONNECTION = new Connection(clusterApiUrl("devnet"));

    const decoded = bs58.decode(PRIVATE_KEY);

    const NEW_ACCOUNT_KEYPAIR =  Keypair.generate();
    const MY_KEYPAIR = Keypair.fromSecretKey(decoded);

    const tx = new Transaction();
    const { lastValidBlockHeight, blockhash } =
    await CONNECTION.getLatestBlockhash();

    const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(0);

    tx.instructions = [
        SystemProgram.transfer({
            fromPubkey: MY_KEYPAIR.publicKey,
            toPubkey: new PublicKey("37u1n4N4ie8bdeDMYJTx9vLg25qbfXtoHP37rSbuRRC6"),
            lamports: minimumRent,
            programId: SystemProgram.programId,
        }),
    ];

    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.recentBlockhash = blockhash;
    tx.feePayer = MY_KEYPAIR.publicKey;
    tx.sign(MY_KEYPAIR);

    const serialized = tx.serialize();
    const txHash = await CONNECTION.sendRawTransaction(serialized);
    console.log(txHash);


}
)();