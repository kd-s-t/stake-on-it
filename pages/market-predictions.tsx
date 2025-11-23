import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import withAuth from '../components/withAuth';
import { useAppDispatch } from '../store/hooks';
import { updateBalance } from '../store/userSlice';

function MarketPredictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stakeDialog, setStakeDialog] = useState({ open: false, coin: '', direction: '', odds: 0 });
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/market-predictions')
      .then(res => res.json())
      .then(data => {
        setPredictions(data.predictions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStakeClick = (coin: string, direction: string, odds: number) => {
    setStakeDialog({ open: true, coin, direction, odds });
    setAmount('');
  };

  const handleStakeConfirm = async () => {
    if (!amount) return;
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setSnackbar({ open: true, message: 'Please enter a valid amount', severity: 'error' });
      return;
    }

    setStakeDialog({ ...stakeDialog, open: false });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake-on-it', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ coin: stakeDialog.coin, prediction: stakeDialog.direction, amount: amountNum, odds: stakeDialog.odds })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (data.balance !== undefined) {
          dispatch(updateBalance(parseFloat(data.balance) || 0));
          const userData = localStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            parsedUser.balance = parseFloat(data.balance) || 0;
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
        }
        setSnackbar({ open: true, message: 'Stake placed successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to place stake', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to place stake', severity: 'error' });
    }
  };

  return (
    <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Market Predictions
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Coin</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Analysis</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>UP Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DOWN Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {predictions.map((pred: any, i: number) => (
                    <TableRow key={i} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{pred.coin}</TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>{pred.analysis}</TableCell>
                      <TableCell sx={{ color: '#10b981', fontWeight: 600 }}>{pred.upOdds}x</TableCell>
                      <TableCell sx={{ color: '#dc3545', fontWeight: 600 }}>{pred.downOdds}x</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          startIcon={<TrendingUp />}
                          onClick={() => handleStakeClick(pred.coin, 'up', pred.upOdds)}
                          sx={{
                            mr: 1,
                            bgcolor: '#10b981',
                            '&:hover': { bgcolor: '#059669' },
                            fontSize: '0.875rem'
                          }}
                        >
                          UP {pred.upOdds}x
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<TrendingDown />}
                          onClick={() => handleStakeClick(pred.coin, 'down', pred.downOdds)}
                          sx={{
                            bgcolor: '#dc3545',
                            '&:hover': { bgcolor: '#c82333' },
                            fontSize: '0.875rem'
                          }}
                        >
                          DOWN {pred.downOdds}x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
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
                handleStakeConfirm();
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
          <Button onClick={handleStakeConfirm} variant="contained" disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
  )
}

export default withAuth(MarketPredictions);