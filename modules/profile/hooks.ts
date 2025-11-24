import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/redux';
import { updateBalance, setUser } from '../../lib/redux';
import { UserStats, SnackbarState } from './types';

export const useProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [depositLoading, setDepositLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
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
        dispatch(updateBalance(newBalance));
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
        dispatch(updateBalance(newBalance));
        if (user) {
          dispatch(setUser({ user: { ...user, balance: newBalance }, token: token || '' }));
        }
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

  return {
    showModal,
    setShowModal,
    amount,
    setAmount,
    stats,
    loading,
    depositLoading,
    snackbar,
    setSnackbar,
    balance,
    handleDeposit
  };
};