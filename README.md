# celo-number-guess-sdk

TypeScript SDK for reading the Celo Number Guess contract from Celo mainnet.

```ts
import { CeloNumberGuessClient } from "celo-number-guess-sdk";

const client = new CeloNumberGuessClient({
  contractAddress: "0xd3d9252A13F306CF36D0a56079f78a4be1fdAe43",
});

const totalGuesses = await client.getTotalGuesses();
```
