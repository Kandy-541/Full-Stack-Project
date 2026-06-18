const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: {
      city: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'House', 'Studio'],
    },
    imageUrls: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
