import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Typography, TextField, Button, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' as 'error' | 'success' });
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
        // Update Redux store
        dispatch(setUser({ user: data.user, token: data.token }));
        setSnackbar({ open: true, message: isLogin ? 'Login successful!' : 'Registration successful!', severity: 'success' });
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setLoading(false);
        setSnackbar({ open: true, message: data.error || 'Authentication failed', severity: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setSnackbar({ open: true, message: 'Authentication failed', severity: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', bgcolor: '#f9f8f8' }}>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        whileHover={{ scale: 1.05 }}
        style={{ marginBottom: '40px' }}
      >
          <Image 
            src="/horizontal.png" 
            alt="Logo" 
            width={300} 
            height={80}
            priority
          />
      </motion.div>
      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#424242',
                  mb: 2,
                  '&:hover': { bgcolor: '#212121' },
                  '&:disabled': { bgcolor: '#616161' }
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                    <span>{isLogin ? 'Logging in...' : 'Registering...'}</span>
                  </Box>
                ) : (
                  isLogin ? 'Login' : 'Register'
                )}
              </Button>
            </form>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  textTransform: 'none',
                  color: '#424242',
                  '&:hover': { bgcolor: 'rgba(66, 66, 66, 0.04)' }
                }}
              >
                {isLogin ? 'Register' : 'Login'}
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
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
    </Box>
  );
}
