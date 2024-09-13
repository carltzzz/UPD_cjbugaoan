import { clusterApiUrl, Keypair, Connection, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"));

    const decoded = bs58.decode("4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP")
    const user = Keypair.fromSecretKey(decoded);

    const tokenMint = await createMint(
        connection, 
        user, 
        user.publicKey,
        null,
        2,

    );

    // console.log(`Created token mint: ${tokenMint.toString()}`);

    const recipient = new PublicKey("37u1n4N4ie8bdeDMYJTx9vLg25qbfXtoHP37rSbuRRC6");

    const tokenMintAccount = new PublicKey("7AiCz3SEtk45dFQxzziFUS3SJEQFtNB4TzuG4QzjqXAh");

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        user, 
        tokenMintAccount,
        recipient,
    );
    console.log(`token account: ${tokenAccount.address.toBase58()}`);

    // const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

    // const recipientAssociatedTokenAccount = new PublicKey("");

    // const txHash = await mintTo(connection, user, tokenMintAccount, recipientAssociatedTokenAccount, user, 10 * MINOR_UNITS_PER_MAJOR_UNITS);
    // console.log("txHash: ", txHash);
}
)();