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
const socketLogin = login => {
    console.log('emit LOGIN')
    socket.emit('LOGIN', {
        Class: login.Class,
        team: login.team,
        password: login.password
    })
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
        const classErr = data.Class? 'invalid Class':''
        const pwdErr = data.password? 'wrong password': ''
        const errMsg = data.password && data.Class?
            classErr+' | '+pwdErr : classErr+pwdErr
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
            type: 'FETCH_PROGRAMS',
            programs: JSON.parse(data)
        })
    })
}
export { api, socketLogin }
