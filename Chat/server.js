const express = require("express");
const expressws = require("express-ws");
var app = express();
var clients = {}; // {1: WebSocket, 2: WebSocket2}
var names = {};
expressws(app);

app.use(express.static("./views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.ws("/", (ws, req) => {
    var id = Math.random();
    while(clients[id])
        id = Math.random();
    
    clients[id] = ws;
    console.log("Новый пользователь");

    ws.on("message", (data) => {
        data = JSON.parse(data);
        switch(data.type){
            case "nameMessage":
                clients[id].name = data.name;
                break;
            case "message":
                sendAll(data.text, clients[id].name);
                break;
        }

    });
    ws.on("close", () => {
        delete clients[id]
        console.log("Соединение закрыто")
    });

});

app.listen(3000, () => {
    console.log("Server was created");
});

function sendAll(text, name){
    var i = 0;
    for(i in clients){
        var obj = {"type": "message", "text": text, "name": name};
        clients[i].send(JSON.stringify(obj));
    }
}