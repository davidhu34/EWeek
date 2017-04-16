export const Add = () => ({
    type: 'ADD'
})

export const creationDialog = () => {
    return {
        type: 'LAUNCH_CREATION_DIALOG'
    }
}
export const editDialog = idx => {
    return {
        type: 'LAUNCH_EDIT_DIALOG',
        index: idx
    }
}
export const deleteDialog = idx => {
    return {
        type: 'LAUNCH_DELETE_DIALOG',
        index: idx
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

export const dialogAction = {
    'create': (p, ins) => ({
        type: 'INS_CREATE',
        instruction: ins
    }),
    'edit': (insId) => ({
        type: 'INS_UPDATE',
        instruction: insId
    }),
    'delete': (p, idx) => ({
        type: 'INS_DELETE',
        index: idx
    }),
    'close': () => ({
        type: 'CLOSE_DIALOG'
    })
}
