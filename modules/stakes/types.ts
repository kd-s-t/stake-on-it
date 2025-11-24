export interface Stake {
  id: number;
  market_id: string;
  prediction: 'up' | 'down';
  amount: string;
  odds: number;
  status: string;
  display_status?: string;
  created_at: string;
  up_bet_count?: number;
  down_bet_count?: number;
  analysis?: string;
}

export interface StakeDialogState {
  open: boolean;
  originalStake: Stake | null;
  prediction: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}