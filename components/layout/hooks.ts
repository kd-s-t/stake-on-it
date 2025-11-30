import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../lib/redux';
import { setUser, updateBalance } from '../../lib/redux';
import { logout } from '../../lib/auth-utils';

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
        if (!token) {
          console.warn('No token found, skipping balance refresh');
          return;
        }
        const res = await fetch('/api/user-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.expired || res.status === 401) {
            logout();
            return;
          }
          console.error('Failed to refresh balance:', errorData);
          return;
        }
        const data = await res.json();
        if (data.balance !== undefined) {
          dispatch(updateBalance(parseFloat(data.balance) || 0));
        }
      } catch (error) {
        console.error('Failed to refresh balance:', error);
      }
    };

    refreshBalance();
    // Refresh on route change
    const interval = setInterval(refreshBalance, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [user, router.pathname, dispatch]);

  return { user };
};