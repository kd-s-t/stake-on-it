import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(WrappedComponent: any) {
  return function AuthComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
}