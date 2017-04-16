const initModal = {
    open: false,
    type: '',
    title: '',
    content: '',
    idx: 0,
    tempIns: null
}

export const modal = ( state=initModal, action ) => {
    switch (action.type) {
        case 'LAUNCH_DELETE_DIALOG':
            return {
                open: true,
                type: 'delete',
                idx: action.index,
                title: 'Delete #'+String(action.index+1),
                content: 'Delete this instruction?',
                tempIns: null
            }
        case 'LAUNCH_EDIT_DIALOG':
            return {
                open: true,
                type: 'update',
                idx: action.index,
                title: 'Edit #'+String(action.index+1),
                content: 'click UPDATE to save changes',
                tempIns: action.instruction
            }
        case 'LAUNCH_CREATION_DIALOG':
            return {
                open: true,
                type: 'create',
                idx: action.index,
                title: 'Creating #'+String(action.index+1),
                content: 'create new instruction',
                tempIns: null
            }
        case 'UPDATE_TEMP':
            return {
                ...state,
                tempIns: {
                    ...state.tempIns,
                    [action.attribute]: action.value
                }
            }
        case 'CLOSE_DIALOG':
            return initModal
        default:
            return state
    }
}
