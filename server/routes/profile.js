const express = require('express');
const getProfileController = require('../controllers/profile/getProfileController');
const setProfileController = require('../controllers/profile/setProfileController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.get('/', getProfileController);
router.use(verifyJWT);
router.post('/', setProfileController)

module.exports = router;