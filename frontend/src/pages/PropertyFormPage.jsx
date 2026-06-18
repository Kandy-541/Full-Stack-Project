import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyForm from '../components/PropertyForm';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function PropertyFormPage({ token }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');
    try {
      await axios.post(`${API}/properties`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create property');
    }
  };

  return (
    <section className="page card">
      <h1>New Property</h1>
      <PropertyForm onSubmit={handleSubmit} submitLabel="Create listing" />
      {error && <p className="error">{error}</p>}
    </section>
  );
}
