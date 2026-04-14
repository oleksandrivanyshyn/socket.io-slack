const express = require('express');
const app = express();
const socketio = require('socket.io');
const Room = require('./classes/Room');

const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

app.set('io',io);


app.get('/change-ns',(req, res)=>{
    namespaces[0].addRoom(new Room(0,'Deleted Articles',0))
    io.of(namespaces[0].endpoint).emit('nsChange',namespaces[0]);
    res.json(namespaces[0]);
})

io.use((socket,next)=>{
    const jwt = socket.handshake.query.jwt;
    console.log(jwt);
    if(1){
        next()
    }else{
        console.log("Goodbye")
        socket.disconnect()
    }
})

io.on('connection',(socket)=>{
    const userName = socket.handshake.query.userName;
    const jwt = socket.handshake.query.jwt;

    socket.emit('welcome',"Welcome to the server.");
    socket.on('clientConnect',(data)=>{
        console.log(socket.id,"has connected")
        socket.emit('nsList',namespaces)
    })
})

namespaces.forEach(namespace=>{
    io.of(namespace.endpoint).on('connection',(socket)=>{
        socket.on('joinRoom',async(roomObj,ackCallBack)=>{
            const thisNs = namespaces[roomObj.namespaceId];
            const thisRoomObj = thisNs.rooms.find(room=>room.roomTitle === roomObj.roomTitle)
            const thisRoomsHistory = thisRoomObj.history;

            const rooms = socket.rooms;
            let i = 0;
            rooms.forEach(room=>{
                if(i!==0){
                    socket.leave(room);
                }
                i++;
            })

            socket.join(roomObj.roomTitle);

            const sockets = await io.of(namespace.endpoint).in(roomObj.roomTitle).fetchSockets()
            const socketCount = sockets.length;

            ackCallBack({
                numUsers: socketCount,
                thisRoomsHistory,
            })
        })

        socket.on('newMessageToRoom',messageObj=>{
            console.log(messageObj);
            const rooms = socket.rooms;
            const currentRoom = [...rooms][1];
            io.of(namespace.endpoint).in(currentRoom).emit('messageToRoom',messageObj)
            const thisNs = namespaces[messageObj.selectedNsId];
            const thisRoom = thisNs.rooms.find(room=>room.roomTitle === currentRoom);
            console.log(thisRoom)
            thisRoom.addMessage(messageObj);
        })

    })
})
