const { validationResult } = require('express-validator');
const User = require('../models/user.js');
const hashedPassword = require('../hashedPassword/hashedPassword.js')

exports.createUser = (req,res,next) => {
	const {userName, email, firstName, lastName,kelas,age, tempatTanggalLahir, tahunAjaran, password, confirmPassword} = req.body;
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		const err = new Error('Terjadi kesalahan saat mendaftar')
		err.errorStatus = 400;
		err.data = errors.array();
		res.status(404).send(err)
	}

	const newHashed = hashedPassword.hashedPassword(password);
	const confirmHashed = hashedPassword.hashedPassword(confirmPassword);
	if(newHashed === confirmHashed){
		const MyUser = new User({
			userName,
			email,
			firstName,
			lastName,
			kelas,
			age,
			tempatTanggalLahir,
			tahunAjaran,
			password: newHashed, 
			confirmPassword: confirmHashed
		})
		User.findOne({$or:[{userName: userName}, {firstName:firstName}, {email:email}, {lastName:lastName}]})
		.then(user => {
			if(user){
				const err = new Error('user already exists')
				err.errorStatus = 400;
				err.data = errors.array();
				throw err
			} else {
				MyUser.save()
				.then(respone => {
					res.status(201).json({
						message: "Akun berhasil dibuat",
						data: respone
					})
				})
				.catch(err => res.status(400).send({error: "Terjadi kesalahan saat mendaftar"}))
			}
		})
		.catch(err => res.status(400).send({error: "User sudah terdaftar"}))
		
	}
}

exports.getUser = (value) => {
	return User.findOne({$or:[{userName: value}, {email: value}, {firstName: value}, {lastName: value}]})
	.then(user => user)
	.catch(err => res.status(400).send({error: "User sudah terdaftar", message:err}))
}
exports.getUserByUserName = (value) => {
	return User.findOne({userName: value})
	.then(user => user)
	.catch(err => res.status(400).send({error: "User sudah terdaftar", message: err}))
}