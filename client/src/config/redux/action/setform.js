import Axios from 'axios';
import Cookies from 'js-cookie'

export const setRegister = (formtype, formvalue) => {
	return {
		type: "SET_FORM_REGISTER", formtype, formvalue
	}
}

export const setLogin = (formtype, formvalue) => {
	return{
		type:"SET_FORM_LOGIN", formtype, formvalue
	}
}

export const setUser = (formtype, formvalue) => {
	return {
		type: "SET_FORM_USER", formtype, formvalue
	}
}

export const setImageProfile = (load) => {
	return {
		type:"SET_PROFILE_IMAGE", load 
	}
}

export const registerPost = (myData) => {
	return new Promise((resolve, reject) => {
		const data = new FormData();
		data.append('userName', myData.userName);
		data.append('email', myData.email);
		data.append('firstName', myData.firstName);
		data.append('lastName', myData.lastName);
		data.append('kelas', myData.kelas);
		data.append('age', myData.age);
		data.append('tempatTanggalLahir', myData.tempatTanggalLahir);
		data.append('tahunAjaran', myData.tahunAjaran);
		data.append('password', myData.password);
		data.append('confirmPassword', myData.confirmPassword);

		Axios.post('http://localhost:5000/register', data, {
			headers: {
				'cotent-type': 'multipart/form-data'
			}
		})
		.then(respone => respone)
		.catch(error => {
			if(error.response.data.data !== undefined){
				const errorData = error.response.data.data
				reject(errorData)
			}
		})
	})

}

export const loginPost = async (myData) => {
	return new Promise(async (resolve, reject) => {
		const data = new FormData();
		await data.append('userName', myData.userName);
		await data.append('password', myData.password);
		await Axios.post('http://localhost:5000/login', data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
		.then(async respone => {
			const {accesToken, refreshToken} = respone.data
			await Cookies.set('accesToken', accesToken);
			await Cookies.set('refreshToken', refreshToken);
			resolve(false)
		})
		.catch(error => {
			if(error.response.data.data !== undefined){
				const messageError = error.response.data.data[0].msg
				reject({error: true, message:messageError})
			} else {
				const messageError = error.response.data.error
				reject({error: true, message:messageError})
			}
		});	
	})	
}

export const updateUser = (myData, firstName, lastName,id) => {

	const data = new FormData();
	data.append('firstName', firstName || myData.firstName);
	data.append('lastName', lastName || myData.lastName);
	data.append('kelas', myData.kelas);
	data.append('age', myData.age);
	data.append('tempatTanggalLahir', myData.tempatTanggalLahir);
	data.append('tahunAjaran', myData.tahunAjaran);
	data.append('image', myData.image);
	data.append('point', myData.point);

	Axios.put(`http://localhost:5000/user/dashboard/${id}`, data, {
		headers:{
            'content-type': 'multipart/form-data'
        }
	})
	.then(respone => {
		return respone
	})
	.catch(err => {
		console.log(err)
	})
}

export const getUserById = async (path,id) => {
	return await Axios.get(`http://localhost:5000/${path}/${id}`)
	.then(respone => {
		return respone
	})
	.catch(async error => {
		if(error.response.data.error !== undefined ){
			await Cookies.remove('user', {path:"/"});
            await Cookies.remove('refreshToken', {path:"/"});
			window.location.assign('http://localhost:3000/login')
			return error.response.data.error
		}
	})
	
}