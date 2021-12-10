const initState = {
	getMyUser: {}
}

export const GetUserById = (state = initState, action) => {
	
	switch(action.type){
		case "GET_USER":
		
		return {

			...state, getMyUser: {
				...state.getMyUser,
				[action.formtype]: action.formvalue
				
			}
		}
		default:
			return state
	}
}