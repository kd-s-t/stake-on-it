import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, IconButton } from '@mui/material';
import { TrendingUp, TrendingDown, Refresh, Close } from '@mui/icons-material';
import withAuth from '../components/withAuth';
import { useAppDispatch } from '../store/hooks';
import { updateBalance } from '../store/userSlice';
import { getCryptoIconUrl } from '../lib/s3-icons';

function MarketPredictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stakeDialog, setStakeDialog] = useState({ open: false, coin: '', direction: '', odds: 0, analysis: '' });
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [analysisModal, setAnalysisModal] = useState({ open: false, coin: '', analysis: '' });
  const dispatch = useAppDispatch();

  const fetchPredictions = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    
    try {
      const res = await fetch('/api/market-predictions');
      const data = await res.json();
      setPredictions(data.predictions || []);
      const fetchTime = new Date();
      setLastFetchTime(fetchTime);
      localStorage.setItem('predictions_last_fetch', fetchTime.toISOString());
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('predictions_last_fetch');
    if (saved) {
      try {
        setLastFetchTime(new Date(saved));
      } catch (e) {
        // Invalid date, ignore
      }
    }
    fetchPredictions();
  }, []);

  const formatLastFetchTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const handleRefresh = () => {
    if (lastFetchTime) {
      const timeSinceLastRefresh = Date.now() - lastFetchTime.getTime();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      if (timeSinceLastRefresh < oneHour) {
        return; // Cooldown active, don't refresh
      }
    }
    fetchPredictions(false);
  };

  const isRefreshCooldown = () => {
    if (!lastFetchTime) return false;
    const timeSinceLastRefresh = Date.now() - lastFetchTime.getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    return timeSinceLastRefresh < oneHour;
  };

  const getCooldownRemaining = () => {
    if (!lastFetchTime) return null;
    const timeSinceLastRefresh = Date.now() - lastFetchTime.getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const remaining = oneHour - timeSinceLastRefresh;
    if (remaining <= 0) return null;
    const minutes = Math.ceil(remaining / (60 * 1000));
    return minutes;
  };

  const handleStakeClick = (coin: string, direction: string, odds: number, analysis: string) => {
    setStakeDialog({ open: true, coin, direction, odds, analysis });
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
        body: JSON.stringify({ coin: stakeDialog.coin, prediction: stakeDialog.direction, amount: amountNum, odds: stakeDialog.odds, analysis: stakeDialog.analysis })
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
    <>
      <Card sx={{ mb: '20px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Market Predictions
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {lastFetchTime && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  Last updated: {formatLastFetchTime(lastFetchTime)}
                  {(() => {
                    const cooldownMinutes = getCooldownRemaining();
                    if (cooldownMinutes !== null) {
                      return ` (${cooldownMinutes}m cooldown)`;
                    }
                    return '';
                  })()}
                </Typography>
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={isRefreshing ? <CircularProgress size={16} /> : <Refresh />}
                onClick={handleRefresh}
                disabled={isRefreshing || loading || isRefreshCooldown()}
                sx={{
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  },
                  '&:disabled': {
                    borderColor: 'divider',
                    color: 'text.disabled'
                  }
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
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
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            component="img"
                            src={getCryptoIconUrl(pred.coin.toLowerCase())}
                            alt={pred.coin}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                          />
                          <Typography sx={{ fontWeight: 600 }}>{pred.coin}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {expandedAnalysis === i ? pred.analysis : `${pred.analysis.substring(0, 100)}...`}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => setAnalysisModal({ open: true, coin: pred.coin, analysis: pred.analysis })}
                            sx={{ textTransform: 'none', fontSize: '0.75rem', p: 0, minWidth: 'auto' }}
                          >
                            Show more
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#10b981', fontWeight: 600 }}>{pred.upOdds}x</TableCell>
                      <TableCell sx={{ color: '#dc3545', fontWeight: 600 }}>{pred.downOdds}x</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          startIcon={<TrendingUp />}
                          onClick={() => handleStakeClick(pred.coin, 'up', pred.upOdds, pred.analysis)}
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
                          onClick={() => handleStakeClick(pred.coin, 'down', pred.downOdds, pred.analysis)}
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
      
      <Dialog
        open={analysisModal.open}
        onClose={() => setAnalysisModal({ open: false, coin: '', analysis: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {analysisModal.coin} News
            </Typography>
            <IconButton
              onClick={() => setAnalysisModal({ open: false, coin: '', analysis: '' })}
              size="small"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {analysisModal.analysis}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnalysisModal({ open: false, coin: '', analysis: '' })} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withAuth(MarketPredictions);