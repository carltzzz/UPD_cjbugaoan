import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemInstruction, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58"

(async () => {
    const PRIVATE_KEY = "fQaqSvseo13Qjaxop5mYikT6ZFenRpxPmR7oUGLFd5hR56kyw4mvxxQ1x59ycTqKN4uQJYBVyc4QxGroPrqk8mQ";
    const decoded = bs58.decode(PRIVATE_KEY);

    const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
    const CONNECTION = new Connection(clusterApiUrl("devnet"));

    const { lastValidBlockHeight, blockhash} = await CONNECTION.getLatestBlockhash();
    const tx = new Transaction();

    const minRent = await CONNECTION.getMinimumBalanceForRentExemption(0);

    tx.instructions = [
        SystemProgram.transfer({
            fromPubkey: MY_KEYPAIR.publicKey,
            toPubkey: new PublicKey("7AiCz3SEtk45dFQxzziFUS3SJEQFtNB4TzuG4QzjqXAh"),
            lamports: minRent,
        }),
    ];

    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.recentBlockhash = blockhash;

    tx.sign(MY_KEYPAIR);

    const serialized = tx.serialize();
    const txHash = await CONNECTION.sendRawTransaction(serialized);

    console.log(txHash);
})();









