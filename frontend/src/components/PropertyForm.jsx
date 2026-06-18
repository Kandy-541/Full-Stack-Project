export default function PropertyForm({ onSubmit, initialData = {}, submitLabel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const rawPrice = form.price.value.trim();
    const numericPrice = Number(rawPrice.replace(/[^0-9.-]/g, ''));
    const data = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      price: numericPrice,
      city: form.city.value.trim(),
      country: form.country.value.trim(),
      propertyType: form.propertyType.value,
      imageUrls: form.imageUrls.value
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean),
    };
    onSubmit(data);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>
        Title
        <input name="title" defaultValue={initialData.title || ''} required />
      </label>
      <label>
        Description
        <textarea name="description" defaultValue={initialData.description || ''} required />
      </label>
      <label>
        Price (CFA)
        <input
          name="price"
          type="text"
          defaultValue={initialData.price ? initialData.price.toLocaleString() : ''}
          placeholder="e.g. 1 250 000"
          required
        />
      </label>
      <label>
        City
        <input name="city" defaultValue={initialData.location?.city || ''} required />
      </label>
      <label>
        Country
        <input name="country" defaultValue={initialData.location?.country || ''} required />
      </label>
      <label>
        Property Type
        <select name="propertyType" defaultValue={initialData.propertyType || 'Apartment'} required>
          <option>Apartment</option>
          <option>House</option>
          <option>Studio</option>
        </select>
      </label>
      <label>
        Image URLs (comma-separated)
        <input name="imageUrls" defaultValue={(initialData.imageUrls || []).join(', ')} />
      </label>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
