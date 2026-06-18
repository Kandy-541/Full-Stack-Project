import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PropertyFormPage from './pages/PropertyFormPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import PropertyEditPage from './pages/PropertyEditPage';
import Header from './components/Header';

const tokenKey = 'propspace_token';

function App() {
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('propspace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (authToken, userData) => {
    localStorage.setItem(tokenKey, authToken);
    localStorage.setItem('propspace_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('propspace_user');
    setToken(null);
    setUser(null);
  };

  const handleProfileUpdate = (updatedUser) => {
    localStorage.setItem('propspace_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <div className="app-shell">
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage token={token} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={token ? <DashboardPage token={token} user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/properties/new"
            element={token ? <PropertyFormPage token={token} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={token ? <ProfilePage token={token} user={user} onProfileUpdate={handleProfileUpdate} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/properties/:id/edit"
            element={token ? <PropertyEditPage token={token} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/properties/:id"
            element={<PropertyDetailPage token={token} user={user} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
