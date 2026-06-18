import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DashboardPage({ token, user }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const loadProperties = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API}/properties/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (err) {
      setError('Unable to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadProperties();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this property permanently?');
    if (!confirmed) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete listing');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>My Dashboard</h2>
          <p>Welcome back, {user?.username}.</p>
          <p className="subtitle">Manage your property listings from one place.</p>
        </div>
        <div className="card-actions">
          {/* <Link className="btn-secondary" to="/profile">Manage account</Link> */}
          <Link className="button" to="/properties/new">Create new property</Link>
        </div>
      </div>
      
      {loading ? (
        <p>Loading your listings…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : properties.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <div className="grid">
          {properties.map((property) => (
            <article key={property._id} className="property-card">
              <div>
                <strong>{property.title}</strong>
                <p>{property.description}</p>
              </div>
              <div className="property-card-meta">
                <span>{property.price.toLocaleString()} CFA</span>
                <div className="card-actions">
                  <Link to={`/properties/${property._id}`}>View</Link>
                  <Link to={`/properties/${property._id}/edit`}>Edit</Link>
                  <button
                    className="btn-secondary danger"
                    onClick={() => handleDelete(property._id)}
                    disabled={deletingId === property._id}
                  >
                    {deletingId === property._id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
