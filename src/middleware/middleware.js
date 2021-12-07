require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const { validationResult } = require('express-validator');

module.exports = async (req,res,next) => {
	const {userName} = req.body
	
	let token = req.headers['authorization'];
	token = token.split(' ')[1];

	await jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
		if(user){
			User.findById(user.userId)
			.then(dataUser => {

				req.user = dataUser;
				next();
			})
		} else if( err.message === 'jwt expired'){
            return res.json({
                message: "Token expired",
                success: false
            });
        } else {
            return res.status(403).json({
                err,
                message: "User not authenticated"
            })
        }
	})
}