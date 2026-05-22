import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  // Simple routing
  const pathname = window.location.pathname;

  if (!isAuthenticated && pathname !== '/login') {
    return <Login />;
  }

  if (pathname === '/dashboard' || pathname === '/') {
    return <Dashboard />;
  }

  return <Login />;
}
