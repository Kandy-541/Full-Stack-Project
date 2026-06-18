import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function PropertyDetailPage({ token, user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API}/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError('Unable to load property.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const isAuthor = property?.author?._id === user?.id || property?.author?._id === user?._id;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!token || !isAuthor) return;
    const confirmDelete = window.confirm('Are you sure you want to remove this listing from the marketplace?');
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await axios.delete(`${API}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete property');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="page card">
      {loading ? (
        <p>Loading property…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : property ? (
        <>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
          <div className="detail-row">
            <span>Price: {property.price.toLocaleString()} CFA</span>
            <span>Type: {property.propertyType}</span>
            <span>Location: {property.location.city}, {property.location.country}</span>
          </div>
          <div className="detail-row">
            <span>Author: {property.author?.username}</span>
            <span>Created: {new Date(property.createdAt).toLocaleDateString()}</span>
          </div>
          {isAuthor && (
            <div className="detail-row">
              <Link className="button" to={`/properties/${id}/edit`}>Edit this listing</Link>
              <button className="button danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Removing…' : 'Delete listing'}
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Property not found.</p>
      )}
    </section>
  );
}
