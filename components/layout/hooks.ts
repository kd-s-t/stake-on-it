import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../lib/redux';
import { setUser, updateBalance } from '../../lib/redux';

export const useLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      dispatch(setUser({ user: parsedUser, token }));
    }
  }, [dispatch]);

  // Refresh balance periodically and on route change
  useEffect(() => {
    if (!user) return;

    const refreshBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.balance !== undefined) {
          dispatch(updateBalance(parseFloat(data.balance) || 0));
        }
      } catch (error) {
        console.error('Failed to refresh balance');
      }
    };

    refreshBalance();
    // Refresh on route change
    const interval = setInterval(refreshBalance, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [user, router.pathname, dispatch]);

  return { user };
};