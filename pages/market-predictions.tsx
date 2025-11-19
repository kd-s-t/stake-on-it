import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import withAuth from '../components/withAuth';
import { useAppDispatch } from '../store/hooks';
import { updateBalance } from '../store/userSlice';

function MarketPredictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleStake = async (coin: string, direction: string, odds: number) => {
    const amount = prompt('Enter amount in pesos:');
    if (!amount) return;
    
    const amountNum = parseFloat(amount);
    const potentialWin = amountNum * odds;
    
    if (!confirm(`Stake ₱${amountNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} on ${coin} ${direction.toUpperCase()}\nOdds: ${odds}\nPotential winnings: ₱${potentialWin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake-on-it', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ coin, prediction: direction, amount: amountNum, odds })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Update Redux balance
        if (data.balance !== undefined) {
          dispatch(updateBalance(parseFloat(data.balance) || 0));
          // Update localStorage
          const userData = localStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            parsedUser.balance = parseFloat(data.balance) || 0;
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
        }
        alert('Stake placed successfully!');
      } else {
        alert(data.error || 'Failed to place stake');
      }
    } catch {
      alert('Failed to place stake');
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
                          onClick={() => handleStake(pred.coin, 'up', pred.upOdds)}
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
                          onClick={() => handleStake(pred.coin, 'down', pred.downOdds)}
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
  )
}

export default withAuth(MarketPredictions);