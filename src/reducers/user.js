const initUser = {
	profile: null,
	login: {
		info: '',
		Class: '',
	    team: '',
	    password: ''
	},
	viewing: null,
	saving: false
}

export const user = (state=initUser, action) => {
	switch (action.type) {
		case 'SAVING_CHANGES':
			return {
				...state,
				saving: true
			}
		case 'SAVED_CHANGES':
			return {
				...state,
				saving: false
			}
		case 'RESELECT_TEAM':
			return {
				...state,
				viewing: null
			}
		case 'UPDATE_LOGIN':
			return {
				...state,
				login: {
					...state.login,
					[action.attribute]: action.value
				}
			}
		case 'LOGIN':
			return {
				...state,
				profile: action.profile,
				login: null,
			}
		case 'SELECT_PROGRAM':
			return {
				...state,
				viewing: action.program
			}
		default:
			return state
	}
}
