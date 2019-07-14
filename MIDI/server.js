const express = require("express")
const expressws = require("express-ws")
const fs = require("fs")

const app = express()

var clients = {}; // {1 : WebSocket1, 2: WebSocket2}
var fd;

expressws(app)

app.use(express.static("./views"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.ws("/", (ws, req) => {
    var id = Math.random();

    while(clients[id]) id = Math.random()

    clients[id] = ws;
    console.log("Новое соединение");
     
    ws.on("message", (data) => {
        
        try{
    
        data = JSON.parse(data)
        switch(data.type) {
            
            case "nameFile":
                fd = fs.openSync(__dirname + "/views/data/" + data.name, "w")
                break;

            case "message":
                sendAll(data.text, clients[id].name)
                break;
        }
    }catch(ex){
        fs.writeFile(fd, data, () => {
            console.log("data: ", data)
            console.log("File has been uploaded")
            fs.closeSync(fd)
        })
    }
    })
})

app.listen(3000, () => {
    console.log("Server was created")
})

function sendAll(text, name) {
    for(let i in clients) {
        var obj = {"type": "message", "text": text, "name": name}
        clients[i].send(JSON.stringify(obj))
    }
}