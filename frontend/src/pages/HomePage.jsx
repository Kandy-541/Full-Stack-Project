import { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API}/properties`, { params: { city: city || undefined } });
        setProperties(response.data);
      } catch (err) {
        setError('Unable to load properties.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [city]);


  return (
    <section className="page">
      <section className="hero card">
        <div className="hero-copy">
          <p className="eyebrow">Explore listings</p>
          <h1>Find your next property with PropSpace</h1>
          <p className="hero-tagline">
            Browse curated homes for rent or sale. Filter by city and enjoy a clean,
            responsive marketplace built for modern property searches.
          </p>
        </div>
      </section>

      <div className="page-header">
        <div>
          <h2>Public Property Feed</h2>
          <p className="subtitle">Open access marketplace with search filters for every budget.</p>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-box">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Filter by city"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading listings…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
