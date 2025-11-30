import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { checkTokenExpiration, logout } from '../lib/auth-utils';

export default function withAuth(WrappedComponent: any) {
  return function AuthComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const hasChecked = useRef(false);

    useEffect(() => {
      if (hasChecked.current) return;
      
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        router.push('/login');
        return;
      }

      if (checkTokenExpiration(token)) {
        logout();
        return;
      }
      
      setIsAuthenticated(true);
      setLoading(false);
      hasChecked.current = true;
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
}