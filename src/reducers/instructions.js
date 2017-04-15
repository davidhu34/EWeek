const initInstructions = {
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

export const instructions = ( state=initInstructions, action ) => {
    switch (action.type) {
        default:
            return state
    }
}
