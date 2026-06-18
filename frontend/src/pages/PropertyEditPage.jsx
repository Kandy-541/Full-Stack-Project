import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PropertyForm from '../components/PropertyForm';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function PropertyEditPage({ token }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API}/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError('Unable to load property for editing.');
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError('');
    try {
      await axios.put(`${API}/properties/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/properties/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update property');
    }
  };

  if (loading) {
    return <section className="page card"><p>Loading property…</p></section>;
  }

  return (
    <section className="page card">
      <h1>Edit property</h1>
      {error && <p className="error">{error}</p>}
      {property ? (
        <PropertyForm onSubmit={handleSubmit} initialData={property} submitLabel="Save changes" />
      ) : (
        <p>Unable to load property.</p>
      )}
    </section>
  );
}
