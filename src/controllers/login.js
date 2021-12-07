require('dotenv').config()
const { validationResult } = require('express-validator');
const User = require('../models/user.js');
const hashedPassword = require('../hashedPassword/hashedPassword.js');
const jwt = require('jsonwebtoken');

exports.createLogin = (req,res,next) => {
	const errors = validationResult(req)
	const {userName,password} = req.body;
	if(!errors.isEmpty()){
		const err = new Error('Terjadi kesalahan saat login');
		err.erorStatus = 400;
		err.data = errors.array()
		res.status(400).send(err)
	}

	const newHashed = hashedPassword.hashedPassword(password);

	User.findOne({$or:[{userName: userName, password: newHashed}, {email: userName, password: newHashed}]})
	.then(user => {
		if(user){
			const accesToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "2s"})

			const refreshToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_REFRESH, {expiresIn: "7d"});

			res.status(200).json({
				message: "Login Success",
				accesToken,
				refreshToken
			})
		} else {
			const err = new Error('Terjadi kesalahan pada Username atau Password Anda.')
			err.errorStatus = 400;
			err.data = errors.array()
			throw err
		}
	})
	.catch(err => res.status(400).send({error: "Terjadi Kesalahan Pada UserName Atau Password Anda."}))
}

exports.getUser = (req,res,next) => {
	const jsonUser = req.params.userId;
	const idUser = String(jsonUser)
	User.findById(idUser)
	.then(user => {
		if(user){
			res.status(200).json({
				data: user
			})
		}
	})
	.catch(err => res.status(404).send({error: "Terjadi Kesalahan Saat Memuat Data"}))
}