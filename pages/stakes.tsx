import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import withAuth from '../components/withAuth';
import { useAppDispatch } from '../store/hooks';
import { updateBalance } from '../store/userSlice';

function Stakes() {
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stakeDialog, setStakeDialog] = useState({ open: false, originalStake: null as any, prediction: '' });
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const dispatch = useAppDispatch();

  const getTimeRemaining = (createdAt: string) => {
    const created = new Date(createdAt);
    const expiry = new Date(created.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    const now = new Date();
    const remaining = expiry.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  useEffect(() => {
    fetch('/api/all-stakes')
      .then(res => res.json())
      .then(data => {
        setStakes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStakeOnExisting = (originalStake: any, prediction: string) => {
    setStakeDialog({ open: true, originalStake, prediction });
    setAmount('');
  };

  const handleStakeConfirm = async () => {
    if (!amount) return;
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setSnackbar({ open: true, message: 'Please enter a valid amount', severity: 'error' });
      return;
    }

    const odds = stakeDialog.prediction === 'up' ? 1.8 : 2.2;
    setStakeDialog({ ...stakeDialog, open: false });
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/place-bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          stake_id: stakeDialog.originalStake.id, 
          prediction: stakeDialog.prediction, 
          amount: amountNum, 
          odds 
        })
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
        setSnackbar({ open: true, message: 'Bet placed successfully!', severity: 'success' });
        fetch('/api/all-stakes')
          .then(res => res.json())
          .then(data => {
            setStakes(data);
          })
          .catch(() => {});
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to place stake', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to place stake', severity: 'error' });
    }
  };

  return (
    <>
      <Card sx={{ mb: '20px' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            All Stakes
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Coin</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Prediction</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Time Left</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Bets</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Analysis</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stakes.map((stake: any) => {
                    return (
                      <TableRow key={stake.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{stake.market_id}</TableCell>
                        <TableCell>
                          <Chip
                            label={stake.prediction.toUpperCase()}
                            icon={stake.prediction === 'up' ? <TrendingUp /> : <TrendingDown />}
                            color={stake.prediction === 'up' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>₱{parseFloat(stake.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>{stake.odds}x</TableCell>
                        <TableCell>
                          <Chip
                            label={stake.status}
                            size="small"
                            sx={{
                              bgcolor: stake.status === 'active' ? '#10b981' : '#f9f8f8',
                              color: stake.status === 'active' ? 'white' : '#000'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                            {getTimeRemaining(stake.created_at)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                            ↗️ {stake.up_bet_count || 0} UP | ↘️ {stake.down_bet_count || 0} DOWN
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem', maxWidth: '200px' }}>
                            {stake.analysis || 'No analysis provided'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<TrendingUp />}
                            onClick={() => handleStakeOnExisting(stake, 'up')}
                            sx={{
                              mr: 1,
                              bgcolor: '#10b981',
                              '&:hover': { bgcolor: '#059669' },
                              fontSize: '0.75rem'
                            }}
                          >
                            UP
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<TrendingDown />}
                            onClick={() => handleStakeOnExisting(stake, 'down')}
                            sx={{
                              bgcolor: '#dc3545',
                              '&:hover': { bgcolor: '#c82333' },
                              fontSize: '0.75rem'
                            }}
                          >
                            DOWN
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
            Stake on {stakeDialog.originalStake?.market_id} {stakeDialog.prediction.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Odds: {stakeDialog.prediction === 'up' ? '1.8' : '2.2'}x
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
              Potential winnings: ₱{(parseFloat(amount) * (stakeDialog.prediction === 'up' ? 1.8 : 2.2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default withAuth(Stakes);