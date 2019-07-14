const ip = document.location.host // 127.0.0.3:3000
const socket = new WebSocket("ws://" + ip);


var sendMes = function(){
    $("#sendButton").click(function(){
        
        var mes = {"text": $("#inp").val(), "type": "message"};
        socket.send(JSON.stringify(mes));
        $("#inp").val("");
    });
    $("#inp").keyup(function(e){
        if(e.key == "Enter"){
            var mes = {"text": $("#inp").val(), "type": "message"};
            socket.send(JSON.stringify(mes));
            $("#inp").val("");
        }  
    });
}

socket.onopen = function(){
    console.log("Соединение установлено");

    sendMes();
    
    var name = prompt("Введите ваше имя"); 

    var obj = {"name": name, "type": "nameMessage"};
    socket.send(JSON.stringify(obj));

};

socket.onclose = function(event){
    if(event.wasClean){
        console.log("Соединение закрыто чисто");
    }
    else{
        console.log("Обрыв соединения");
        console.log("Код: " + event.code + " причина: " + event.reason);
    }
};
// Принятие сообщения
socket.onmessage = function(message){
    message = JSON.parse(message.data);
    switch(message.type){
        case "message": 
            $("<h4 id = \"mes\">" + message.name + ": " + message.text + "</h4>").appendTo("body");
            break;
    }
};

socket.onerror = function(){

};