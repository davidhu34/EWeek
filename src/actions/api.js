import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const newMsg = msg => {
    const payload = {
        ...msg,
        message: msg.message.replace('\n','')
    }
    console.log('emit', payload)
    socket.emit('MESSAGE', payload)
}

const api = (dispatch) => {
    socket.on( 'connect', () => {
        console.log('socket connected')
        socket.emit('INIT_DATA', {})
        dispatch({
            type: 'SOCKET_CONNECT'
        })
    })

    socket.on('INIT_DATE', (data) => {
        console.log('received data', data)
    })
}
export { api, newMsg }
