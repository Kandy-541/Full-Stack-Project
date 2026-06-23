import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API}/auth/login`, { email, password });
      onLogin(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="page auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <p className="eyebrow">Account access</p>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to manage your account, property listings, saved searches and profile preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Continue to dashboard</button>
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link> and start managing your profile.
          </p>
        </form>
      </div>
    </section>
  );
}
