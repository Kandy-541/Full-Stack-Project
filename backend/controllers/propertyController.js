const Property = require('../models/Property');

exports.getProperties = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice, type } = req.query;
    const filters = {};
    if (city) filters['location.city'] = new RegExp(`^${city.trim()}$`, 'i');
    if (type) filters.propertyType = type;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filters).populate('author', 'username email');
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('author', 'username email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
};

exports.getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ author: req.user._id });
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

exports.createProperty = async (req, res, next) => {
  try {
    const { title, description, price, city, country, propertyType, imageUrls } = req.body;
    if (!title || !description || !price || !city || !country || !propertyType) {
      return res.status(400).json({ message: 'Missing required property fields' });
    }

    const newProperty = await Property.create({
      author: req.user._id,
      title,
      description,
      price,
      location: { city, country },
      propertyType,
      imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
    });

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (!property.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden: not the property author' });
    }

    const { title, description, price, city, country, propertyType, imageUrls } = req.body;
    if (title !== undefined) property.title = title;
    if (description !== undefined) property.description = description;
    if (price !== undefined) property.price = price;
    if (propertyType !== undefined) property.propertyType = propertyType;
    if (city !== undefined) property.location.city = city;
    if (country !== undefined) property.location.country = country;
    if (imageUrls !== undefined) property.imageUrls = Array.isArray(imageUrls) ? imageUrls : property.imageUrls;

    await property.save();
    res.json(property);
  } catch (error) {
    next(error);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (!property.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden: not the property author' });
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};
