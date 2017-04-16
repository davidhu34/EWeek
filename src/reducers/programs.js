const initPrograms = {
    '1': {
        id: '1',
        team: 'A',
        instructionOrder: ['1', '2', '3'],
        instructions: {
            '1': {
                id: '1',
                name: 'Join Dark',
                type: 'do',
                content: 'Join me to the dark side'
            },
            '2': {
                id: '2',
                name: 'Repeat joining dark',
                type: 'repeat',
                content: 'Join me to the dark side twice',
                repeat: {
                    from: 1,
                    to: 1,
                    times: 2
                },
                then: 3
            },
            '3': {
                id: '3',
                name: 'Return to Light',
                type: 'do',
                content: 'come back to the light'
            }
        }
    }
}

const instructions = (state, action) => {
    switch (action.type) {
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
        case 'INS_UPDATE':
            return {
                ...state,
                instructions:
                    instructions(state.instructions, action)
            }
        case 'INS_CHANGE_ORDER':
            const order = state.instructionOrder
            const pos = action.upordown?
                action.index : action.index+1
            return {
                ...state,
                instructionOrder: [
                    ...order.slice(0, pos),
                    order[pos+1], order[pos],
                    ...order.slice(pos+2)
                ]
            }
        default:
            return state
    }
}
export const programs = ( state=initPrograms, action ) => {
    switch (action.type) {
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
