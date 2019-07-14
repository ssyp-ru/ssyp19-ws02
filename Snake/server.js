const express = require("express")
const expressws = require("express-ws")
const app = express()
const fs = require("fs")

expressws(app)

var recordsData = {}
var newRegisterName = ''
var recordsFile = fs.openSync("records.json", 'r')

fs.readFile(recordsFile, (err, data) => {
    recordsData = data
    fs.closeSync(recordsFile)
    try{
        recordsData = JSON.parse(recordsData.toString())
    }
    catch(ex){
        recordsData = {}
    }
})
app.use(express.static("./views"))
app.get("/authorize", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
app.get("/game", (req, res) => {
    res.sendFile(__dirname + '/views/main.html')
})
app.ws("/", (ws, req) => {
    ws.on("message", (message) => {
        message = JSON.parse(message)
        switch(message.type){
            case "NameMsg":
                console.log(message.data)
                if(recordsData[message.data] != null){
                    var obj = {"type":"RegistrationServerRespond", "data":"Success"}
                    ws.send(JSON.stringify(obj))
                }
                else{
                    var obj = {"type":"RegistrationServerRespond", "data":"noSuchPlayer"}
                    ws.send(JSON.stringify(obj))
                    newRegisterName = message.data
                }
            break
            case "RegistrationMessage":
                console.log(message.data)
                if(message.data == true){
                    console.log("@")
                    recordsData[newRegisterName] = 0
                    recordsFile = fs.openSync("records.json", 'w')
                    console.log(recordsData)
                    fs.writeFile(recordsFile, JSON.stringify(recordsData), (err) => {
                        fs.closeSync(recordsFile)
                    })
                }
            break
            case "GetRecord":
                var obj = {"type":"RecordMessage", "data":recordsData[message.data]}
                ws.send(JSON.stringify(obj))
            break
            case "NewRecord":
                recordsData[message.data[1]] = message.data[0]
                recordsFile = fs.openSync("records.json", "w")
                fs.writeFile(recordsFile, JSON.stringify(recordsData), (err) => {
                    fs.closeSync(recordsFile)
                })
            break
        }
    })
})
app.listen(8888, () => {
    console.log("server created")
})