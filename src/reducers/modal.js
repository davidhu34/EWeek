const initModal = {
    open: false,
    type: 'yo'
}

export const modal = ( state=initModal, action ) => {
    switch (action.type) {
        case 'LAUNCH_DELETE_DIALOG':
            return {
                open: true,
                type: 'delete'
            }
        case 'CLOSE_DIALOG':
            return {
                ...state, open: false
            }
        default:
            return state
    }
}
