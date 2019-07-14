const express = require("express");
const expressws = require("express-ws");
const fs = require('fs');
var userData = {}; 
var usersFile = {}; 
var app = express(); 
var clients = {};//{1: WebSoket, 2: WebSoket } 
expressws(app); 

app.use(express.static("./views")) ;

var usersFile = fs.openSync("users.json","r");

fs.readFile(usersFile,(err,data)=>{ 
    userData = JSON.parse(data.toString()); 
    fs.closeSync(usersFile); 
    console.log(userData); 
}); 

app.get("/", (req,res) => { 
    res.sendFile(__dirname + "/views/index.html"); 
});

app.get("/main", (req, res) => {
    res.sendFile(__dirname + "/views/main/main.html");
});



app.listen(8080,() =>{ 
    console.log("Server was created"); 
});

app.ws("/",(ws,red) =>{ 

    let id = Math.random(); 
    while(clients[id]) id = Math.random() 
        clients[id] = ws;

    //ws.send("text send") 
    ws.on("message",(data)=>{ 
        data = JSON.parse(data); 
        switch(data.type){ // Обработчик типов 
            case "login": // Логин 
                if(!userData[data.login]) { 
                    var obj = {"password": data.password, "type":"userNotFound", "login": data.login};
                    ws.send(JSON.stringify(obj));
                } else if(userData[data.login] != data.password){
                    ws.send(JSON.stringify({"type": "wrongPassword"}));
                }
                    else    
                        enter(ws, data.login);
                break;
            case "newUser": // Создать нового польователь 
                userData[data.login] = data.password; 
                
                usersFile = fs.openSync("users.json","w"); 
                fs.writeFile(usersFile, JSON.stringify(userData), ()=>{ 
                    fs.closeSync(usersFile);
                });

                enter(ws, data.login);
                break;

           
        }
    })

    ws.on("close", () => { 
        delete clients[id];
    });
});

function enter(ws, login){
    var obj = {"type": "enter", "login": login};
    ws.send(JSON.stringify(obj));
}