const express = require('express')
const router = express.Router();
const refreshTokenController = require('../controllers/refreshToken.js')

router.post('/refresh', refreshTokenController.refreshToken)

module.exports = router