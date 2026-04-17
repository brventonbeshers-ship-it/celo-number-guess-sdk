export interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
}

export interface NumberGuessStats {
  guesses: number;
  wins: number;
  lastGuess: number;
  lastSecret: number;
  lastDistance: number;
  winRate: number;
}

export interface CeloNumberGuessConfig {
  contractAddress: string;
  rpcUrl?: string;
}
