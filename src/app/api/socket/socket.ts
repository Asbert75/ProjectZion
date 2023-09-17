import { IncomingMessage, ServerResponse } from 'http'
import { Server } from 'socket.io'

const SocketHandler = (req: IncomingMessage, res: ServerResponse) => {
    if (res.socket.server?.io) console.log('Socket already running')
    else {
        console.log('Socket initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }

    res.end()
}

export default SocketHandler