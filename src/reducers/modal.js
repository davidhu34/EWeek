const initModal = {
    open: false,
    type: '',
    title: '',
    content: '',
    idx: 0,
    tempIns: {}
}

export const modal = ( state=initModal, action ) => {
    switch (action.type) {
        case 'LAUNCH_DELETE_DIALOG':
            return {
                open: true,
                type: 'delete',
                idx: action.index,
                title: 'Delete #'+String(action.index+1),
                content: 'Delete this instruction?'
            }
        case 'CLOSE_DIALOG':
            return initModal
        default:
            return state
    }
}
