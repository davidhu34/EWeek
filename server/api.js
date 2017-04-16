//const ensureLogin = require('connect-ensure-login')
const md5 = require('md5')
const { Router } = require('express')

const successLog = ( data ) => {
    console.log( 'on query success:\n', data )
}
const users = {}

module.exports = ( io, models ) => {
//    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const { Program } = models
    const router = Router()
    router.get( '/yo', (req, res, next) => {
        console.log('yo')
        res.send( 'yo' )
    })


    io.on('connection', socket => {
        console.log(socket.id)
        socket.on( 'INIT_DATA', ( req ) => {
            console.log('init data req')
            Program.find({id: '2'}, ( err, programs ) => {
                console.log('found', err, programs)
                io.emit( 'INIT_DATA', {})
            }).then( successLog )
        })
    })
    return router
}
