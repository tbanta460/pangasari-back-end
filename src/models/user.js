const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
	userName:{
		type: String,
		required: [true, "Enter a email"]
	},
	email: {
		type: String,
		required: true
	},
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
	kelas:{
		type: String,
		required: true
	},
	age:{
		type: String,
		required: true
	},
	tempatTanggalLahir:{
		type: String,
		required: true
	},
	tahunAjaran:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	confirmPassword:{
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	point: {
		type: String,
		required: false
	}
}, {
	timestamp: true
})

module.exports = mongoose.model('user', user);