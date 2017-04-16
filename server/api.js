//const ensureLogin = require('connect-ensure-login')
const md5 = require('md5')
const { Router } = require('express')

const successLog = ( data ) => {
    console.log( 'on query success:\n', data )
}
const classes = [
    'kyber',
    'bespin',
    'whills',
    'yavin4',
    'cantina',
    'yubnub',
    'atat',
    'dagobah',
    'kenobi',
    'bbunit'
]
let users = {}
const user = socket => {
    console.log(socket.id)
    socket.on( 'LOGIN', login => {
        console.log('data req', login)
        const {Class, team, password} = login
        const validClass = classes.indexOf(Class) > -1
        const validPassword = password === Class+team
        if (validClass && validPassword) {
            socket.emit('LOGIN_SUCCESS', {
                profile: {
                    id: password,
                    team: team,
                    Class: Class
                }
            })
        } else {
            socket.emit('LOGIN_FAIL', {
                Class: validClass,
                password: validPassword
            })
        }
    })
    /*Program.find({id: '2'}, ( err, programs ) => {
        console.log('found', err, programs)
        io.emit( 'INIT_DATA', {})
    }).then( successLog )*/
}


module.exports = ( io, models ) => {
//    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const { Program } = models
    const router = Router()
    router.get( '/yo', (req, res, next) => {
        console.log('yo')
        res.send( 'yo' )
    })


    io.on('connection', socket => {
        user(socket)
    })
    return router
}
