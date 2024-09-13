import bs58 from 'bs58';
import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountIdempotentInstruction, createInitializeMint2Instruction, createMintToCheckedInstruction, getAssociatedTokenAddress, getAssociatedTokenAddressSync, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token'; 

// 1. Create Mint Account
// 2. Create Token Account
// 3. Minting or Creating a supply


(async () => {

    const PRIVATE_KEY = "4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP";
    const decoded = bs58.decode(PRIVATE_KEY);

    const CONNECTION = new Connection(clusterApiUrl("devnet"));
    const { lastValidBlockHeight, blockhash } = await CONNECTION.getLatestBlockhash();

    const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
    const NEW_KEYPAIR = Keypair.generate();

    const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(MINT_SIZE);
    const tx = new Transaction();

    const makerATA = getAssociatedTokenAddressSync(
        NEW_KEYPAIR.publicKey,
        MY_KEYPAIR.publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    tx.instructions = [
        SystemProgram.createAccount({
            fromPubkey: MY_KEYPAIR.publicKey,
            newAccountPubkey: NEW_KEYPAIR.publicKey,
            lamports: minimumRent,
            space: MINT_SIZE,
            programId: SystemProgram.programId,
        }),
        createInitializeMint2Instruction(
            NEW_KEYPAIR.publicKey,
            6,
            MY_KEYPAIR.publicKey,
            MY_KEYPAIR.publicKey,
            TOKEN_PROGRAM_ID,
        ),
        createAssociatedTokenAccountIdempotentInstruction(
            MY_KEYPAIR.publicKey,
            makerATA,
            MY_KEYPAIR.publicKey,
            NEW_KEYPAIR.publicKey,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
        ),
        createMintToCheckedInstruction(
            NEW_KEYPAIR.publicKey,
            makerATA,
            MY_KEYPAIR.publicKey,
            1000 * 10**6,
            6, 
            undefined,
            TOKEN_PROGRAM_ID,
            
        )
    ];


    // const txHash = await CONNECTION.sendTransaction(tx, [MY_KEYPAIR, NEW_KEYPAIR]);
    // console.log(txHash);

    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.recentBlockhash = blockhash;
    tx.sign(MY_KEYPAIR, NEW_KEYPAIR);

    const serialized = tx.serialize();
    const txHash = await CONNECTION.sendRawTransaction(serialized);

    console.log(txHash);  
})();