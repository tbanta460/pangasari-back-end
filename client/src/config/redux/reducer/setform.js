const initState = {
	
	register: {
		userName: "",
		email: "",
		firstName: "",
		lastName:"",
		tempatTanggalLahir: "",
		tahunAjaran:"",
		kelas:"",
		age: "",
		password: "",
		confirmPassword:""
	},
	login: {
		userName:"",
		password:""
	},
	user:{
		fullName: "",
		firstName: "",
		lastName: "",
		tempatTanggalLahir: "",
		tahunAjaran:"",
		kelas:"",
		age: "",
		image: null,
		point: 0
	},
	profileImage: null,
	messageError:""
}

export const SetForm = (state = initState, action) => {
	// console.log(action.type)
	switch(action.type){
		case "SET_FORM_REGISTER":
		return{
			...state,
			register:{
				...state.register,
				[action.formtype]: action.formvalue
			}
		}
		case "SET_FORM_LOGIN":
		return{
			...state,
			login: {
				...state.login,
				[action.formtype]: action.formvalue
			}
		}
		case "SET_FORM_USER": {
			return {
				...state,
				user:{
					...state.user,
					[action.formtype]: action.formvalue
				}
			}
		}
		case "SET_PROFILE_IMAGE": {
			return {
				...state,
				profileImage: action.load
			}
		}
		// case "SET_ERROR_LOGIN": {
			// return{
				// ...state,
				// messageError: action.load
			// }
		// }
		default:
			return state
	}
}