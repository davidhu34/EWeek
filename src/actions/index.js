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

export const expand = (p, idx, e) => ({
    type: 'INS_EXPAND',
    program: p,
    index: idx,
    expansion: e
})

export const startMove = (idx, o) => {
    return {
        type: 'INS_START_MOVE',
        index: idx,
        order: o
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

export const endMove = (idx, o, finish) => {
    return (dispatch, getState) => {
        console.log(dispatch, getState)
        const state = getState()
        const p = state.programs[state.user.profile.id]
        dispatch({
            type: finish? 'INS_FINISH_MOVE': 'INS_CANCEL_MOVE',
            order: o,
            program: p.id
        })
        if (finish) {
            dispatch({type:'SAVING_CHANGES'})
            emitChanges(p)
        }
    }
}
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
