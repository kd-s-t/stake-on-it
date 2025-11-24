export interface Prediction {
  coin: string;
  analysis: string;
  upOdds: number;
  downOdds: number;
}

export interface StakeDialogState {
  open: boolean;
  coin: string;
  direction: string;
  odds: number;
  analysis: string;
}

export interface AnalysisModalState {
  open: boolean;
  coin: string;
  analysis: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}