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
    const router = Router()
    const { Program } = models
    Program.find({}, (err, programs) => {
        if (err) {
            console.log('server init data error', err)
        } else {
            programs.map( p => {
                console.log(p)
                console.log('program:',p.id)
                const pData = JSON.parse(p.data)
                classProgram[pData.Class][pData.team] = p
            })
            console.log('all data:')
        }
    })
    const user = socket => {
        console.log(socket.id)
        socket.on( 'LOGIN', login => {
            console.log('data req', login)
            const {Class, team, password} = login
            const validClass = classes.indexOf(Class) > -1
            const validPassword = password === Class+team
            const id = password
            console.log(validClass, validPassword)
            if (validClass && validPassword) {
                const profile = {
                    id: id,
                    team: team,
                    Class: Class
                }
                users[socket.id] = profile
                //users[socket.id].socket = socket
                console.log(users[socket.id])
                socket.emit('LOGIN_SUCCESS', {
                    profile: profile
                })
                const pCache = classProgram[profile.Class][profile.team]
                if (!pCache) {
                    console.log('new data for:', id)
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
                } else socket.emit( 'PROGRAM_DATA', pCache)
                console.log('sending p data')
                Object.keys(classProgram[Class]).map( k => {
                    console.log('class program key', k)
                    socket.emit('PROGRAM_DATA',
                        classProgram[Class][k].data
                    )
                })
            } else {
                socket.emit('LOGIN_FAIL', {
                    Class: validClass,
                    password: validPassword
                })
            }
        })
        socket.on('SAVE_CHANGES', program => {
            const u = users[socket.id]
            const newSave = {
                id: u.id,
                data: JSON.stringify(program)
            }
            classProgram[u.Class][u.team] = newSave
            console.log('u', u, 'p', program)
            Program.update( {id: u.id},
                newSave,
                (err, n, res) => {
                    console.log('update cb:', err, n, res)
                    if (err) console.log('save fail')
                    else {
                        socket.emit('SAVE_SUCCESS', program)
                        socket.broadcast.emit('PROGRAM_DATA', newSave.data)
                        //Object.keys(users).map( id => {
                        //    io.sockets.socket(id).emit('PROGRAM_DATA', newSave.data)
                        //})
                    }
                }
            )
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
