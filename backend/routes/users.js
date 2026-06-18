const express = require('express');
const authenticate = require('../middleware/auth');
const { getProfile, updateProfile, changePassword } = require('../controllers/userController');

const router = express.Router();

router.use(authenticate);
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.put('/me/password', changePassword);

module.exports = router;
