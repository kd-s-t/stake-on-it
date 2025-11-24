import { useState, useEffect } from 'react';
import { Button, Snackbar, Alert, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import withAuth from '../components/withAuth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateBalance, setUser } from '../store/userSlice';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [depositLoading, setDepositLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const balance = user?.balance || 0;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setStats(data);
        const newBalance = parseFloat(data.balance) || 0;
        // Update Redux store
        dispatch(updateBalance(newBalance));
        // Also update full user if needed
        if (user) {
          dispatch(setUser({ user: { ...user, balance: newBalance }, token: token || '' }));
        }
      } catch (error) {
        console.error('Failed to fetch stats');
      }
      setLoading(false);
    };
    
    fetchStats();
  }, [dispatch, user]);

  const handleDeposit = async () => {
    if (!amount) return;
    setDepositLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        const newBalance = parseFloat(data.balance) || 0;
        // Update Redux store
        dispatch(updateBalance(newBalance));
        // Also update full user
        if (user) {
          dispatch(setUser({ user: { ...user, balance: newBalance }, token: token || '' }));
        }
        // Update localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          parsedUser.balance = newBalance;
          localStorage.setItem('user', JSON.stringify(parsedUser));
        }
        setShowModal(false);
        setAmount('');
        setSnackbar({ open: true, message: 'Deposit successful!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Deposit failed', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Deposit failed', severity: 'error' });
    } finally {
      setDepositLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Balance</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>₱{(Number(balance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <button 
              onClick={() => setShowModal(true)}
              style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Deposit Money
            </button>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Wins</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{stats?.wins || 0}</p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Losses</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{stats?.losses || 0}</p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Total Profit</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: stats?.totalProfit >= 0 ? '#28a745' : '#dc3545' }}>
              ₱{(stats?.totalProfit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <h3>My Stakes</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Coin</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Prediction</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Odds</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Potential Win</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats?.stakes?.map((stake: any) => (
              <tr key={stake.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{stake.market_id}</td>
                <td style={{ padding: '10px', color: stake.prediction === 'up' ? 'green' : 'red' }}>{stake.prediction.toUpperCase()}</td>
                <td style={{ padding: '10px' }}>₱{parseFloat(stake.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px' }}>{stake.odds}x</td>
                <td style={{ padding: '10px' }}>₱{parseFloat(stake.potential_winnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    backgroundColor: stake.status === 'won' ? '#d4edda' : stake.status === 'lost' ? '#f8d7da' : '#fff3cd',
                    color: stake.status === 'won' ? '#155724' : stake.status === 'lost' ? '#721c24' : '#856404'
                  }}>
                    {stake.status}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>{new Date(stake.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <Dialog open={showModal} onClose={() => !depositLoading && setShowModal(false)}>
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
                if (e.key === 'Enter' && !depositLoading) {
                  handleDeposit();
                }
              }}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} disabled={depositLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleDeposit}
              disabled={depositLoading || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
              variant="contained"
              sx={{
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                '&:disabled': { bgcolor: '#616161' }
              }}
            >
              {depositLoading ? (
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
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
  )
}

export default withAuth(Profile);