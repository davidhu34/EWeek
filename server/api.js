//const ensureLogin = require('connect-ensure-login')
const md5 = require('md5')
const { Router } = require('express')
const OpenCC = require('opencc')
const opencc = new OpenCC('s2twp.json')



const iot = require('./iot');

const users = {}

module.exports = ( io, models ) => {
//    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const router = Router()
    router.get( '/yo', (req, res, next) => {
        console.log('yo')
        res.send( 'yo' )
    })

    io.on('connection', ( socket ) => {
        const id = socket.id
    	console.log('connect client', socket.id)
        users[id] = {}
        users[id].socket = socket

        socket.on('MESSAGE', (msg) => {
            console.log('received msg:', msg)
            let payload = msg
            msg.sid = id
            iot.publish('iot-2/evt/web/fmt/json',
                JSON.stringify({d: payload})
            )

            const reply = "machine reply"
        })

        socket.on('disconnect', () => {
            console.log('disconnect client', id)
            delete users[id]
        })

    })

    iot.on('message', (t,p)=>{
        console.log('t:',t, 'p:',JSON.parse(p))
        const payload = JSON.parse(p)
        const msg = opencc.convertSync(payload.message).replace(/\s/g,'')
        users[payload.sid].socket
            .emit('MESSAGE', {
                local_id: md5(JSON.stringify(payload)),
                sender: 'watson',
                room: 'watsonroom',
                message: msg,
                time: new Date()
            })
    })


    return router
}
