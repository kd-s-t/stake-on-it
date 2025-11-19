import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, CircularProgress, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import withAuth from '../components/withAuth';
import { useAppDispatch } from '../store/hooks';
import { updateBalance } from '../store/userSlice';

function Stakes() {
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/all-stakes')
      .then(res => res.json())
      .then(data => {
        setStakes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStakeOnExisting = async (originalStake: any, prediction: string) => {
    const amount = prompt('Enter amount in pesos:');
    if (!amount) return;
    
    const amountNum = parseFloat(amount);
    const odds = prediction === 'up' ? 1.8 : 2.2; // Simple odds
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake-on-it', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          coin: originalStake.market_id, 
          prediction, 
          amount: amountNum, 
          odds 
        })
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
        // Refresh stakes
        window.location.reload();
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
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Coin</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Prediction</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Odds</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stakes.map((stake: any) => (
                    <TableRow key={stake.id} hover>
                      <TableCell>{stake.user_name}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
  )
}

export default withAuth(Stakes);