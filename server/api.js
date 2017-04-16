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
let classProgram = {}
classes.map( c => {
    classProgram[c] = {}
})


module.exports = ( io, models ) => {
//    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const { Program } = models
    const router = Router()
    router.get( '/yo', (req, res, next) => {
        console.log('yo')
        res.send( 'yo' )
    })

    const user = socket => {
        console.log(socket.id)
        socket.on( 'LOGIN', login => {
            console.log('data req', login)
            const {Class, team, password} = login
            const validClass = classes.indexOf(Class) > -1
            const validPassword = password === Class+team
            const id = password
            if (validClass && validPassword) {
                const profile = {
                    id: id,
                    team: team,
                    Class: Class
                }
                users[socket.id] = profile
                socket.emit('LOGIN_SUCCESS', {
                    profile: profile
                })
                Program.findOne({id: id}, ( err, program ) => {
                    console.log('found', err, program)
                    classProgram[Class][team] = program
                    if (!program) {
                        const init = JSON.stringify({
                            id: id,
                            team: team,
                            Class: Class,
                            instructionOrder: [],
                            instructions: {}
                        })
                        Program.create({
                            id: id,
                            data: init
                        }, (err, p) => {
                            console.log('created for '+id)
                            socket.emit( 'PROGRAM_DATA', init)
                        })
                    } else socket.emit( 'PROGRAM_DATA', program.data)
                    Object.keys(classProgram[Class]).map( k => {
                        console.log('calss program key', k)
                        if (k !== team) {
                            console.log('send key', k)
                            socket.emit('PROGRAM_DATA',
                                classProgram[Class][k].data
                            )
                        }
                    })
                }).then( successLog )
            } else {
                socket.emit('LOGIN_FAIL', {
                    Class: validClass,
                    password: validPassword
                })
            }
        })
        socket.on('SAVE_CHANGES', program => {
            const u = users[socket.id]
            classProgram[u.Class][u.team] = program
            console.log('u', u, 'p', program)
            Program.update( {id: u.id}, {
                id: u.id,
                data: JSON.stringify(program)
            }, (err, n, res) => {
                console.log('update cb:', err, n, res)
                if (err) console.log('save fail')
                else socket.emit('SAVE_SUCCESS', program)
            })
        })
        socket.on('disconnect',() => {
            delete users[socket.id]
        })

    }

    io.on('connection', socket => {
        user(socket)
    })
    return router
}
