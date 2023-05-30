import * as ws from "ws"
import Promise from "promise"
import { Message } from "./messages.js"
import { json } from "stream/consumers"
import { Room } from "./room.js"

const WebSocketPort = 443

const Rooms = new Map<number, Room>()
Rooms.set(0, new Room(0))

Rooms.get(0).messages.push(new Message("anyud", "0", 0, 0))

console.log(JSON.stringify(Rooms.get(0)))

const wss = new ws.WebSocketServer({port: WebSocketPort})

//websocket
wss.on("connection", (ws) => {
    console.log("connected")

    //on message
    ws.on("message", (data, isBinary) => {
        console.log("message sent: " + data.toString())

        wss.clients.forEach((client) => {
            if(client.readyState == ws.OPEN){
                console.log("sent to client")


                client.send(JSON.stringify(data))
            }
        })
    })

})