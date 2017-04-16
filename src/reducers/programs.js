const initPrograms = {
    'A': {
        id: 'A',
        team: 'A',
        instructionOrder: ['1', '2', '3'],
        instructions: {
            '1': {
                id: '1',
                name: 'Join Dark',
                type: 'do',
                content: 'Join me to the dark side',
                repeat: {
                    from: '',
                    to: '',
                    times: ''
                },
                then: '',
                link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                expansion: false
            },
            '2': {
                id: '2',
                name: 'Repeat joining dark',
                type: 'repeat',
                content: 'Join me to the dark side twice',
                repeat: {
                    from: '1',
                    to: '1',
                    times: '2'
                },
                then: '3',
                link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                expansion: false
            },
            '3': {
                id: '3',
                name: 'Return to Light',
                type: 'do',
                content: 'come back to the light',
                repeat: {
                    from: '',
                    to: '',
                    times: ''
                },
                then: '',
                link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                expansion: false
            }
        }
    }
}

const instructions = (state, action) => {
    switch (action.type) {
        case 'INS_DELETE':
            let newState = state
            delete newState[action.instruction.id]
            return newState
        case 'INS_EXPAND':
            return {
                ...state,
                [action.instruction.id]: {
                    ...action.instruction,
                    expansion: action.expansion
                }
            }
        case 'INS_UPDATE':
            return {
                ...state,
                [action.instruction.id]: action.instruction
            }
        default:
            return state
    }
}
const program = (state, action) => {
    switch (action.type) {
        case 'INS_CREATE':
            const newIns = '12'
            return {
                ...state,
                instructions: {
                    ...state.instructions,
                    [newIns]: {
                        ...action.instruction,
                        id: newIns
                    }
                },
                instructionOrder: [
                    ...state.instructionOrder,
                    newIns
                ]
            }
        case 'INS_EXPAND':
        case 'INS_UPDATE':
            return {
                ...state,
                instructions:
                    instructions(state.instructions, action)
            }
        case 'INS_DELETE':
            return {
                ...state,
                instructionOrder:
                    state.instructionOrder.filter(
                        i => i != action.instruction.id
                    ),
                instructions:
                    instructions(state.instructions, action)
            }
        case 'INS_CHANGE_ORDER':
            const order = state.instructionOrder
            const pos = action.upordown?
                action.index-1 : action.index
            return pos > -1 && pos < order.length-1? {
                ...state,
                instructionOrder: [
                    ...order.slice(0, pos),
                    order[pos+1], order[pos],
                    ...order.slice(pos+2)
                ]
            }: state
        default:
            return state
    }
}
export const programs = ( state={}, action ) => {
    switch (action.type) {
        case 'FETCH_PROGRAMS':
            return initPrograms
        case 'INS_CREATE':
        case 'INS_DELETE':
        case 'INS_EXPAND':
        case 'INS_UPDATE':
        case 'INS_CHANGE_ORDER':
            return {
                ...state,
                [action.program]:
                    program(state[action.program], action)
            }
        default:
            return state
    }
}
