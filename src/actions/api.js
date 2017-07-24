import io from 'socket.io-client'

const socket = io('https://discovere2017.mybluemix.net')
//const socket = io('localhost:3000')
const socketLogin = login => {
    console.log('emit LOGIN')
    const date = new Date()
    socket.emit('LOGIN', {
        Class: login.Class,
        team: login.team,
        password: login.password,
        date: date.getTime()
    })
}
const emitChanges = p => {
    console.log('emit SAVE_CHANGES')
    socket.emit('SAVE_CHANGES', p)
}

const api = (dispatch) => {
    socket.on( 'connect', () => {
        console.log('socket connected')
        socket.emit('INIT_DATA', {})
        dispatch({
            type: 'SOCKET_CONNECT'
        })
    })
    socket.on( 'LOGIN_FAIL', data => {
        console.log('LOGIN_FAIL:', data)
        const errMsg = data.Class? data.password? ''
            :'wrong password':'invalid Class'
        console.log(errMsg)
        dispatch({
            type: 'UPDATE_LOGIN',
            attribute: 'info',
            value: errMsg
        })
    })
    socket.on( 'LOGIN_SUCCESS', data => {
        console.log('LOGIN_SUCCESS:', data)
        dispatch({
            type: 'LOGIN',
            profile: data.profile
        })
    })
    socket.on( 'PROGRAM_DATA', data => {
        dispatch({
            type: 'FETCH_PROGRAM',
            program: data
        })
    })
    socket.on( 'SAVE_SUCCESS', data => {
        console.log('SAVE_SUCCESS:', data)
        dispatch({
            type: 'SAVED_CHANGES',
        })
    })
}
export { api, socketLogin, emitChanges }
