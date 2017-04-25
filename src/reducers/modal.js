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
                //title: 'Delete #'+String(action.index+1),
                //note: 'Delete this instruction?',
                title: '刪除 #'+String(action.index+1),
                note: '確定要刪除這項指令？',
                tempIns: action.instruction,
                scroll: document.body.scrollTop
            }
        case 'LAUNCH_EDIT_DIALOG':
            return {
                open: true,
                type: 'update',
                idx: action.index,
                //title: 'Edit #'+String(action.index+1),
                //note: 'click UPDATE to save changes',
                title: '編輯 #'+String(action.index+1),
                note: '按\"確認更新\"以儲存變更',
                tempIns: action.instruction,
                scroll: document.body.scrollTop
            }
        case 'LAUNCH_CREATION_DIALOG':
            return {
                open: true,
                type: 'create',
                idx: action.index,
                //title: 'Creating #'+String(action.index+1),
                //note: 'create new instruction',
                title: '建立 #'+String(action.index+1),
                note: '建立新的指令',
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
                    link: ''
                },
                scroll: document.body.scrollTop
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
        case 'INS_UPDATE':
        case 'INS_DELETE':
            return initModal
        default:
            return state
    }
}
