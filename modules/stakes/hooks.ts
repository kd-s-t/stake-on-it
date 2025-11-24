import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../lib/redux';
import { updateBalance } from '../../lib/redux';
import { Stake, StakeDialogState, SnackbarState } from './types';
import { ODDS } from './consts';

export const useStakes = () => {
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [loading, setLoading] = useState(true);
  const [stakeDialog, setStakeDialog] = useState<StakeDialogState>({ 
    open: false, 
    originalStake: null, 
    prediction: '' 
  });
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const dispatch = useAppDispatch();

  const fetchStakes = async () => {
    try {
      const res = await fetch('/api/all-stakes');
      const data = await res.json();
      setStakes(data);
    } catch (error) {
      console.error('Failed to fetch stakes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStakes();
  }, []);

  const getTimeRemaining = (createdAt: string) => {
    const created = new Date(createdAt);
    const expiry = new Date(created.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    const remaining = expiry.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleStakeOnExisting = (originalStake: Stake, prediction: string) => {
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

    const odds = stakeDialog.prediction === 'up' ? ODDS.UP : ODDS.DOWN;
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
          stake_id: stakeDialog.originalStake?.id, 
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
        fetchStakes();
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to place stake', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to place stake', severity: 'error' });
    }
  };

  return {
    stakes,
    loading,
    stakeDialog,
    setStakeDialog,
    amount,
    setAmount,
    snackbar,
    setSnackbar,
    getTimeRemaining,
    handleStakeOnExisting,
    handleStakeConfirm
  };
};