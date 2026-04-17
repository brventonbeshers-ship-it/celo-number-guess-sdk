import { ethers } from "ethers";
import { CeloNumberGuessConfig, LeaderboardEntry, NumberGuessStats } from "./types";

const ABI = [
  "function guess(uint256 number) external",
  "function totalGuesses() external view returns (uint256)",
  "function userGuesses(address) external view returns (uint256)",
  "function userWins(address) external view returns (uint256)",
  "function getUserStats(address player) external view returns (uint256 guesses, uint256 wins, uint256 latestGuess, uint256 latestSecret, uint256 latestDistance)",
  "function getLeaderboard() external view returns (address[10], uint256[10])",
];

export class CeloNumberGuessClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  public contractAddress: string;

  constructor(config: CeloNumberGuessConfig) {
    const rpcUrl = config.rpcUrl || "https://forno.celo.org";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contractAddress = config.contractAddress;
    this.contract = new ethers.Contract(config.contractAddress, ABI, this.provider);
  }

  async getTotalGuesses(): Promise<number> {
    const total = await this.contract.totalGuesses();
    return Number(total);
  }

  async getUserStats(address: string): Promise<NumberGuessStats> {
    const [guesses, wins, lastGuess, lastSecret, lastDistance] = await this.contract.getUserStats(address);
    const guessCount = Number(guesses);
    const winCount = Number(wins);
    return {
      guesses: guessCount,
      wins: winCount,
      lastGuess: Number(lastGuess),
      lastSecret: Number(lastSecret),
      lastDistance: Number(lastDistance),
      winRate: guessCount === 0 ? 0 : Math.round((winCount / guessCount) * 100),
    };
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const [addresses, scores] = await this.contract.getLeaderboard();
    const entries: LeaderboardEntry[] = [];

    for (let i = 0; i < 10; i++) {
      const address = addresses[i];
      const score = Number(scores[i]);
      if (address !== ethers.ZeroAddress && score > 0) {
        entries.push({ address, score, rank: i + 1 });
      }
    }

    return entries;
  }
}

export { ABI as CELO_NUMBER_GUESS_ABI };
