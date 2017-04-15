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
export const changeOrder = (idx, upordown) => {
    return {
        type: 'INS_CHANGE_ORDER',
        index: idx,
        upordown: upordown
    }
}

export const closeDialog = () => {
    return {
        type: 'CLOSE_DIALOG'
    }
}
