const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const loginController = require('../controllers/login.js')

const bodyUserName = body('userName')
						.notEmpty()
						.withMessage('Masukkan username Anda')
						.matches(/^[a-zA-Z]\w+(@[a-z]\w+[\.][a-z]{2,3}|)/)
                    	.withMessage('Karakter unik tidak diperbolehkan')
                    	.isLength({min: 5})
                    	.withMessage('Masukkan karakter minimal 5');

const bodyPassword = body('password')
                    .notEmpty()
                    .withMessage('Masukkan Password anda')
                    .isLength({min: 5})
                    .withMessage('Masukkan karakter minimal 5');

router.post('/login',[bodyUserName, bodyPassword], loginController.createLogin);

router.get('/login/:userId', loginController.getUser);

module.exports = router