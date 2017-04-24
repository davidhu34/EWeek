import { socketLogin, emitChanges } from './api'

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

export const dialogAction = (t, p, ins) => {
    const type = {
        'create': 'INS_CREATE',
        'update': 'INS_UPDATE',
        'delete': 'INS_DELETE'
    }
    return (dispatch, getState) => {
        dispatch({
            type: type[t],
            program: p,
            instruction: ins
        })
        dispatch({type:'SAVING_CHANGES'})
        const state = getState()
        emitChanges(state.programs[state.user.profile.id])
    }
}

export const closeDialog = {
    type: 'CLOSE_DIALOG'
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
     console.log(Class, team, password)
    if ( Class && team && password ) {
        socketLogin(login)
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
    dispatch({type:'SAVING_CHANGES'})
    const state = getState()
    emitChanges(state.programs[state.user.profile.id])
}
