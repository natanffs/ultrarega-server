import socketio from 'socket.io'
import { Server } from 'http'

let io = socketio()
const connections = []

export const setupWebsocket = (server: Server) => {
    io = socketio(server)

    io.on('connection', socket => {
        connections.push({
            id: socket.id,
        })
    })
}

export const sendMessage = (to, message, data) => {
     connections.forEach(con => {
         io.to(con.id).emit(message, data)
     })
}