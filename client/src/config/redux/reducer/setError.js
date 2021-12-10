const initState = {
	messageError: null,
	errors: {
		userName:"",
		firstName:"",
		lastName:"",
		tahunAjaran:"",
		tempatTanggalLahir:"",
		kelas: "",
		age:"",
		password:"",
		confirmPassword:""
	}
}

export const GetError = (state = initState, action) => {
	// console.log(action.type)
	switch(action.type){
		case "SET_ERROR_LOGIN_TRUE":
		// console.log(action.load)
		return {

			...state, messageError: action.load
		}
		case "SET_ERROR_LOGIN_FALSE":
		// console.log(action.load)
		return {
			...state, messageError: action.load
		}
		case "SET_ERROR_REGISTER":
		// console.log(action.formtype);
		// console.log(action.formvalue)
		return {
			...state,
			error: {
				...state.error,
				[action.formtype]: action.formvalue
			}
		}
		default:
			return state
	}
}