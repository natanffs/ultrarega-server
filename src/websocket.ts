import socketio from 'socket.io'
import { Server } from 'http'

export const setupWebsocket = (server: Server) => {
    const io = socketio(server)

    io.on('connection', socket => {
        console.log(socket.id)
    })
}