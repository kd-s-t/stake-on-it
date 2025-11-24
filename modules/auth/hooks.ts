import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../lib/redux';
import { setUser } from '../../lib/redux';
import { SnackbarState } from './types';

export const useAuth = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'error' 
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(setUser({ user: data.user, token: data.token }));
        setSnackbar({ 
          open: true, 
          message: isLogin ? 'Login successful!' : 'Registration successful!', 
          severity: 'success' 
        });
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setLoading(false);
        setSnackbar({ 
          open: true, 
          message: data.error || 'Authentication failed', 
          severity: 'error' 
        });
      }
    } catch (error) {
      setLoading(false);
      setSnackbar({ 
        open: true, 
        message: 'Authentication failed', 
        severity: 'error' 
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    name,
    setName,
    loading,
    snackbar,
    setSnackbar,
    handleSubmit
  };
};