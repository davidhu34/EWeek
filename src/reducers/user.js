import md5 from 'md5'

const initUser = {
	profile: null,
	login: {
		info: '',
		Class: '',
	    team: '',
	    password: ''
	},
	viewing: null,
	expanding: [],
	prevOrder: [],
	moving: null,
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
				saving: false,
				moving: null
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
		case 'INS_EXPAND':
			return {
				...state,
				expanding: state.expanding.map( (e, idx) => {
					return idx === action.index? action.expansion: e
				}) 
			}
		case 'SELECT_PROGRAM':
			return {
				...state,
				viewing: action.program.id,
				prevOrder: action.program.instructionOrder,
				expanding: action.program.instructionOrder.map(o => false)
			}
		case 'INS_CHANGE_ORDER':
			const delta = action.upordown?
				action.index > 0? -1: 0
			: action.index < state.expanding.length-1?
					1: 0
			const pos = action.index+delta
			return {
				...state,
				moving: pos,
				expanding: state.expanding.map((e, idx) => {
					return idx === pos
				})
			}
		case 'INS_CREATE':
			return {
				...state,
				expanding: [...state.expanding, true]
			}
		case 'INS_START_MOVE':
			return {
				...state,
				prevOrder: action.order,
				moving: action.index,
				expanding: state.expanding.map( (e, idx) => {
					return idx === action.index
				})
			}
		case 'INS_FINISH_MOVE':
			return {
				...state,
				prevOrder: action.order
			}
		case 'INS_CANCEL_MOVE':
			return {
				...state,
				moving: null,
				prevOrder: action.order,
				expanding: action.order.map(o => false)
			}
		default:
			return state
	}
}
