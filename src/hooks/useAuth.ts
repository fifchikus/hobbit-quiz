import { useState, useCallback, useEffect } from 'react';

interface AuthCredentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<AuthCredentials | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('hobbit_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCredentials(parsed);
        setIsAuthenticated(true);
      } catch {
        sessionStorage.removeItem('hobbit_auth');
      }
    }
  }, []);

  const login = useCallback((username: string, password: string) => {
    const creds = { username, password };
    sessionStorage.setItem('hobbit_auth', JSON.stringify(creds));
    setCredentials(creds);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('hobbit_auth');
    setCredentials(null);
    setIsAuthenticated(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    if (!credentials) return '';
    return 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);
  }, [credentials]);

  return {
    isAuthenticated,
    credentials,
    login,
    logout,
    getAuthHeader,
  };
};
