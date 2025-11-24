export interface UserStats {
  balance: number;
  wins: number;
  losses: number;
  totalProfit: number;
  stakes: UserStake[];
}

export interface UserStake {
  id: number;
  market_id: string;
  prediction: string;
  amount: string;
  odds: number;
  potential_winnings: string;
  status: string;
  created_at: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}