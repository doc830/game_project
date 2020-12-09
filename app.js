const express = require('express')
const config = require('config')
const app = express()
const server = require('http').createServer(app)
const io = require("socket.io")(server)
const PORT = config.get('port') || 5000
app.use('/', require('./routes/gameplay.routes'))
let SOCKET_LIST = {}
let PLAYER_LIST = {}
async function start() {
    try {
        io.sockets.on('connection', function (socket) {
            console.log(socket.id+" connected")
            SOCKET_LIST[socket.id] = socket
            socket.on('clientPack', (data) => {
                console.log(data)
                PLAYER_LIST[socket.id] = data
            })
            socket.on('disconnect', function () {
                delete SOCKET_LIST[socket.id]
                delete PLAYER_LIST[socket.id]
                console.log('Socket '+socket.id+' disconnected')
            })
        })
        server.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error ', e.message);
        process.exit(1);
    }
}
start()
setInterval(function () {
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit('serverPack', PLAYER_LIST);
    }
}, 200)
