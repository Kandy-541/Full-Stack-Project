const express = require('express');
const authenticate = require('../middleware/auth');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getProperties);
router.get('/mine', authenticate, getMyProperties);
router.get('/:id', getPropertyById);
router.post('/', authenticate, createProperty);
router.put('/:id', authenticate, updateProperty);
router.delete('/:id', authenticate, deleteProperty);

module.exports = router;
