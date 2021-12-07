const { validationResult } = require('express-validator');
const User = require('../models/user.js');

exports.getUserById = (req,res,next) => {
	
	const errors = validationResult(req);

	if(!errors.isEmpty()){

		const err = new Error('terjadi kesalahan ketika mengambil data')
		err.errorStatus = 400;
		err.data = errors.array();
		res.status(404).send(err)
	}
	const idUser = req.params.userId
	User.findById(idUser)
	.then(user => {
		
		 if(!user){
            const error = new Error('Post berdasarkan Id tidak ditemukan');
            error.errorStatus = 404
            error.data = data.array();
            res.status(404).send(err)

        }
        res.status(200).json({
            message: "User dapat dipanggil",
            data: user
        })
	})
	.catch(err => {
		res.status(404).send({error: "User tidak ditemukan"})
	})

}

exports.getUserByKelas = (req,res,next) => {
	const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
	const kelas  = req.params.kelas;
	const errors = validationResult(req);
	let totalUser;
	if(!errors.isEmpty()){

		const err = new Error('terjadi kesalahan ketika mengambil data')
		err.errorStatus = 400;
		err.data = errors.array();
		throw err
	}

	User.find({kelas: kelas})
	.countDocuments()
	.then(count => {
		totalUser = count
		return User.find({kelas:kelas}).skip((parseInt(currentPage) - 1) * parseInt(perPage))
		.limit(parseInt(perPage))
	})
	.then(user => {
		res.status(200).json({
			message: "User berdasarkan Kelas dapat dipanggil",
			data: user,
			total_users: totalUser,
			per_page: parseInt(perPage),
			current_page: parseInt(currentPage)

		})
	})
	.catch(err => {
		res.status(400).json({
			message: "Terjadi kesalahan",
			data: err
		})
	})
}

exports.updateData = (req,res,next) => {
	const {firstName:fn, lastName:ln, tempatTanggalLahir:ttlr, tahunAjaran:ta, kelas:kls, age:isAge, point} = req.body
	const errors = validationResult(req)
	const user = req.params.user
	if(!errors.isEmpty()){
		const message = "Terjadi kesalahan pada server"
		isError(errors, 404, message)
	}
	
	User.findById(user)
	.then(user => {
		if(!user){
			const message = "Terjadi kesalahan saat memperbarui data"
			isError(errors, 400, message)
		}
		
		user.firstName = fn;
		user.lastName = ln;
		user.tempatTanggalLahir = ttlr;
		user.tahunAjaran = ta
		user.kelas = kls
		user.age = isAge
		if(req.file !== undefined ){
			user.image = req.file.path
		}
		user.point = point
		return user.save()
		
	})
	.then(respone => {
		res.status(200).json({
			message: "Data berhasil diperbarui",
			data: respone
		})
	})
	.catch(err => res.status(404).send({message:"Terjadi kesalahan ketika memuat data."}))
}

const isError = (errors, status, message) => {
		const err = new Error(message);
		err.errorStatus = status;
		err.data = errors.array();
		throw err
}