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
