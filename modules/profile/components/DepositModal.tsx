import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box } from '@mui/material';

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  amount: string;
  setAmount: (amount: string) => void;
  onDeposit: () => void;
  loading: boolean;
}

export default function DepositModal({ open, onClose, amount, setAmount, onDeposit, loading }: DepositModalProps) {
  return (
    <Dialog open={open} onClose={() => !loading && onClose()}>
      <DialogTitle>Deposit Money</DialogTitle>
      <DialogContent>
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
            if (e.key === 'Enter' && !loading) {
              onDeposit();
            }
          }}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onDeposit}
          disabled={loading || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
          variant="contained"
          sx={{
            bgcolor: '#10b981',
            '&:hover': { bgcolor: '#059669' },
            '&:disabled': { bgcolor: '#616161' }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} sx={{ color: 'white' }} />
              <span>Depositing...</span>
            </Box>
          ) : (
            'Deposit'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}