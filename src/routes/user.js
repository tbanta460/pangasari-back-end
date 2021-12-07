const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.js');
const User = userController;
const bodyUserName = body('userName')
						.notEmpty()
						.withMessage('Masukkan username Anda')
						.not()
						.matches(/[^A-za-z0-9\s]/)
                    	.withMessage('Karakter unik tidak diperbolehkan')
                    	.isLength({min: 5})
                    	.withMessage('Masukkan karakter minimal 5')
                    	.custom(async (value) => {
                    		return await User.getUserByUserName(value).then(user => {
                    			if(user){
                    				return Promise.reject(value + " sudah terdaftar")
                    			}
                    		})
                    	})

const bodyEmail = body('email')
					.isEmail()
					.notEmpty()
					.withMessage('Masukkan email Anda')
					.custom(async (value) => {
						return await User.getUser(value).then(user => {
							if(user){
								return Promise.reject('Email sudah terdaftar')
							}
						})
					});

const bodyFirstName = body('firstName')
					.notEmpty()
					.withMessage('Masukkan nama depan Anda')
					.not()
                    .matches(/[^A-za-z\s]/)
                    .withMessage('Masukkan text saja')
                    .isLength({min: 1, max: 20})
                    .withMessage('Masukkan nama depan Anda')
                    .custom(async (value) => {
						return await User.getUser(value).then(user => {
							if(user){
								return Promise.reject(value + ' already exists')
							}
						})
					});

const bodyLastName = body('lastName')
					.notEmpty()
					.withMessage('Masukkan nama belakang Anda')
					.not()
                    .matches(/[^A-za-z\s]/)
                    .withMessage('Masukkan text saja')
                    .isLength({min: 1, max: 20})
                    .withMessage('Masukkan nama belakang Anda')
                    .custom(async (value) => {
						return await User.getUser(value).then(user => {
							if(user){
								return Promise.reject(value + ' already exists')
							}
						})
					});


const bodyPassword = body('password')
                    .notEmpty()
                    .withMessage('Masukkan Password Anda')
                    .isLength({min: 5})
                    .withMessage('Masukkan karakter minimal 5');

const bodyConfirmPassword = body('confirmPassword')
                    .notEmpty()
                    .withMessage('Masukkan Password Anda')
                    .isLength({min: 5})
                    .withMessage('Masukkan karakter minimal 5');

router.post('/register', [
	bodyUserName, bodyEmail, bodyFirstName, bodyLastName, bodyPassword, bodyConfirmPassword
	], userController.createUser);

module.exports = router