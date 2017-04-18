import md5 from 'md5';

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
            const d = new Date()
            const newIns = md5(String(d)+JSON.stringify(action.instruction))
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
        case 'FETCH_PROGRAM':
            return {
                ...state,
                [action.program.id]: action.program
            }
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
