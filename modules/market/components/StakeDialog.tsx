import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { StakeDialogState } from '../types';

interface StakeDialogProps {
  stakeDialog: StakeDialogState;
  setStakeDialog: (dialog: StakeDialogState) => void;
  amount: string;
  setAmount: (amount: string) => void;
  onConfirm: () => void;
}

export default function StakeDialog({ stakeDialog, setStakeDialog, amount, setAmount, onConfirm }: StakeDialogProps) {
  return (
    <Dialog open={stakeDialog.open} onClose={() => setStakeDialog({ ...stakeDialog, open: false })}>
      <DialogTitle>Place Stake</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Stake on {stakeDialog.coin} {stakeDialog.direction.toUpperCase()}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Odds: {stakeDialog.odds}x
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Amount (₱)"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onConfirm();
            }
          }}
        />
        {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Potential winnings: ₱{(parseFloat(amount) * stakeDialog.odds).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setStakeDialog({ ...stakeDialog, open: false })}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}