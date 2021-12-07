require('dotenv').config();
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.refreshToken = (req,res,next) => {
	const token = req.body.token;
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		const err = new Error('Terjadi kesalahan ketika melakukan refresh token');
		err.errorStatus = 400;
		err.data = errors.array();
		throw err
	}

	if(!token){
		const err = new Error("Token Tidak Ditemukan")
        err.errorStatus = 400;
        err.data = errors.array();
        throw err
	}

	jwt.verify(token, process.env.JWT_SECRET_REFRESH, (err, user) => {

		if(!err){
			const accessToken = jwt.sign({id: user.userId}, process.env.JWT_SECRET, {expiresIn: "20s"});
			return res.status(200).json({
				message:"Berhasil mengakses token",
				success: true,
				accessToken
			})
		} else {
			return res.status(400).json({
				message:"Gagal merefresh token",
				success: false
			})
		}
	})
}