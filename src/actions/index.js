//import from './api'

export const Add = () => ({
    type: 'ADD'
})

export const creationDialog = (idx) => {
    return {
        type: 'LAUNCH_CREATION_DIALOG',
        index: idx
    }
}
export const editDialog = (idx, i)=> {
    return {
        type: 'LAUNCH_EDIT_DIALOG',
        index: idx,
        instruction: i
    }
}
export const deleteDialog = (idx, i) => {
    return {
        type: 'LAUNCH_DELETE_DIALOG',
        index: idx,
        instruction: i
    }
}
export const changeOrder = (p, idx, upordown) => {
    return {
        type: 'INS_CHANGE_ORDER',
        program: p,
        index: idx,
        upordown: upordown
    }
}

export const expand = (p, ins, e) => ({
    type: 'INS_EXPAND',
    program: p,
    instruction: ins,
    expansion: e
})

export const dialogAction = {
    'create': (p, ins) => ({
        type: 'INS_CREATE',
        program: p,
        instruction: ins
    }),
    'update': (p, ins) => ({
        type: 'INS_UPDATE',
        program: p,
        instruction: ins
    }),
    'delete': (p, ins) => ({
        type: 'INS_DELETE',
        program: p,
        instruction: ins
    }),
    'close': () => ({
        type: 'CLOSE_DIALOG'
    })
}
export const updateTemp = (attr, value) => {
    return {
        type: 'UPDATE_TEMP',
        attribute: attr,
        value: value
    }
}
export const updateLogin = (attr, value) => {
    return {
        type: 'UPDATE_LOGIN',
        attribute: attr,
        value: value
    }
}

export const submitLogin = login => dispatch => {
    console.log('thunk login')
    const { Class, team, password } = login
    if ( Class && team && password ) {
        if(password === '123') {
            dispatch({
                type: 'LOGIN',
                profile: {
                    id: 1,
                    ...login
                }
            })
            dispatch({
                type: 'FETCH_PROGRAMS',
                programs: {}
            })
        } else {
            dispatch(updateLogin('info', 'wrong password'))
        }
    } else {
        dispatch(updateLogin('info', 'please comlpete form'))
    }
}

export const selectProgram = program => {
    return {
        type: 'SELECT_PROGRAM',
        program: program
    }
}
export const reselectTeam = () => {
    return {
        type: 'RESELECT_TEAM'
    }
}
export const saveChanges = (dispatch, getState) => {
    dispatch({type:'SAVEING_CHANGES'})
    const state = getState()
    setTimeout(() => dispatch({type:'SAVED_CHANGES'}), 3000)
}
