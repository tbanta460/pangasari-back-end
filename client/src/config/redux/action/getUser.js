
export const getUser = (formtype, formvalue) => {
	return {
		type: "GET_USER", formtype,formvalue
	}
}