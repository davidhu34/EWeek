const initModal = {
    open: false,
    type: '',
    title: '',
    note: '',
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
                note: 'Delete this instruction?',
                tempIns: action.instruction
            }
        case 'LAUNCH_EDIT_DIALOG':
            return {
                open: true,
                type: 'update',
                idx: action.index,
                title: 'Edit #'+String(action.index+1),
                note: 'click UPDATE to save changes',
                tempIns: action.instruction
            }
        case 'LAUNCH_CREATION_DIALOG':
            return {
                open: true,
                type: 'create',
                idx: action.index,
                title: 'Creating #'+String(action.index+1),
                note: 'create new instruction',
                tempIns: {
                    name: '',
                    type: 'do',
                    content: '',
                    repeat: {
                        from: '',
                        to: '',
                        times: ''
                    },
                    then: '',
                    expansion: true
                }
            }
        case 'UPDATE_TEMP':
            const attr = action.attribute
            switch (attr) {
                case 'type':
                    return {
                        ...state,
                        tempIns: {
                            ...state.tempIns,
                            type: action.value === 1? 'do': 'repeat'
                        }
                    }
                case 'from':
                case 'to':
                case 'times':
                    return {
                        ...state,
                        tempIns: {
                            ...state.tempIns,
                            repeat: {
                                ...state.tempIns.repeat,
                                [action.attribute]: action.value
                            }
                        }
                    }
                case 'name':
                case 'content':
                case 'then':
                default:
                    return {
                        ...state,
                        tempIns: {
                            ...state.tempIns,
                            [action.attribute]: action.value
                        }
                    }
            }
        case 'CLOSE_DIALOG':
        case 'INS_CREATE':
        case 'INS_DELETE':
            return initModal
        default:
            return state
    }
}
