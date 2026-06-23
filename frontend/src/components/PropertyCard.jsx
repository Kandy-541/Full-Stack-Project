import { Link } from 'react-router-dom';
import { getPropertyImage } from '../utils/propertyImageUtils';

export default function PropertyCard({ property }) {
  const imageUrl = getPropertyImage(property.propertyType, property.imageUrls);
  
  return (
    <article className="property-card">
      <div className="property-card-image">
        <img 
          src={imageUrl} 
          alt={property.title}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="property-card-content">
        <div className="property-card-header">
          <strong>{property.title}</strong>
          <span className="property-type">{property.propertyType}</span>
        </div>
        <p className="property-description">{property.description}</p>
        <div className="property-card-meta">
          <span className="property-location">{property.location.city}, {property.location.country}</span>
          <span className="property-price">{property.price.toLocaleString()} CFA</span>
          <Link to={`/properties/${property._id}`} className="property-link">Details</Link>
        </div>
      </div>
    </article>
  );
}
