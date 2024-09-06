import bs58 from "bs58";
(async () => {
  const PRIVATE_KEY =
    "4Ey5v1YsT7zUa5hBzc6G1nTr8BTAfoPkm6GSdVPAW9hVXPLigP73tTSFS8bka692CCM5VZRqjHwrhFkfyH1K3zqP";
  const decoded = bs58.decode(PRIVATE_KEY);

  console.log(decoded);

  const encoded = bs58.encode(decoded);

  console.log(encoded);
})();