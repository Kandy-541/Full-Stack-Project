import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div>
        <strong>{property.title}</strong>
        <p>{property.description}</p>
      </div>
      <div className="property-card-meta">
        <span>{property.location.city}, {property.location.country}</span>
        <span>{property.price.toLocaleString()} CFA</span>
        <Link to={`/properties/${property._id}`}>Details</Link>
      </div>
    </article>
  );
}
