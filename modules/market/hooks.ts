import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../lib/redux';
import { updateBalance } from '../../lib/redux';
import { Prediction, StakeDialogState, AnalysisModalState, SnackbarState } from './types';
import { REFRESH_COOLDOWN_MS } from './consts';

export const useMarketPredictions = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stakeDialog, setStakeDialog] = useState<StakeDialogState>({ 
    open: false, 
    coin: '', 
    direction: '', 
    odds: 0, 
    analysis: '' 
  });
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [analysisModal, setAnalysisModal] = useState<AnalysisModalState>({ 
    open: false, 
    coin: '', 
    analysis: '' 
  });
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
      if (timeSinceLastRefresh < REFRESH_COOLDOWN_MS) {
        return;
      }
    }
    fetchPredictions(false);
  };

  const isRefreshCooldown = () => {
    if (!lastFetchTime) return false;
    const timeSinceLastRefresh = Date.now() - lastFetchTime.getTime();
    return timeSinceLastRefresh < REFRESH_COOLDOWN_MS;
  };

  const getCooldownRemaining = () => {
    if (!lastFetchTime) return null;
    const timeSinceLastRefresh = Date.now() - lastFetchTime.getTime();
    const remaining = REFRESH_COOLDOWN_MS - timeSinceLastRefresh;
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
        body: JSON.stringify({ 
          coin: stakeDialog.coin, 
          prediction: stakeDialog.direction, 
          amount: amountNum, 
          odds: stakeDialog.odds, 
          analysis: stakeDialog.analysis 
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
        setSnackbar({ open: true, message: 'Stake placed successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to place stake', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to place stake', severity: 'error' });
    }
  };

  return {
    predictions,
    loading,
    stakeDialog,
    setStakeDialog,
    amount,
    setAmount,
    snackbar,
    setSnackbar,
    expandedAnalysis,
    setExpandedAnalysis,
    isRefreshing,
    lastFetchTime,
    analysisModal,
    setAnalysisModal,
    formatLastFetchTime,
    handleRefresh,
    isRefreshCooldown,
    getCooldownRemaining,
    handleStakeClick,
    handleStakeConfirm
  };
};