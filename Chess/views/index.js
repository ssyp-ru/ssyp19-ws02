const ip = document.location.host;//127.0.0.3:3000 
const socket = new WebSocket("ws://" + ip); 

var gaps = function(){
    for(let i = 0; i < $("#password").val().length; i++){
        if($("#password").val()[i] == " "){
            return "Пароль не должен содержать пробелы";
        }
    }

    for(let i = 0; i < $("#login").val().length; i++){
        if($("#login").val()[i] == " "){
            return "Логин не должен содержать пробелы";
        }
    }
    return "все хорошо";
}

var CheckCurrent = function(){
    var gap = gaps();
        if(($("#password").val().length >= 6) && ($("#login").val().length >= 4) && (gap == "все хорошо")){ 
            var password = $("#password").val(); 
            var login = $("#login").val();
            var obj = {"password": password, "type": "login", "login": login}; 
            socket.send(JSON.stringify(obj));

        }
        else if(gap != "все хорошо")
            alert(gap);
        else if(($("#password").val().length >= 6) && ($("#login").val().length < 4))
                 alert("Логин должен содержать более 3 символов");
            else if(($("#login").val().length >= 4) && ($("#password").val().length < 6))
                 alert("Пароль должен содержать более 5 символов");
            else
                alert("Пароль должен содержать более 5 символов, а логин более 3");
}

    if(window.localStorage.getItem("bulLogin"))
        window.location.href="main";

socket.onopen = function(){ 
    console.log("coединение установлено"); 



    $("#sendButton").click(function(){
        CheckCurrent();
    })
    $("#password").keyup(function(e){
        if(e.key == "Enter"){
            CheckCurrent();
            
        }  
    });


} 

socket.onclose = function(event){ 
    if(event.wasClean){ 
    console.log("coединение"); 
    } 
    else 
    { 
        console.log("обрыв соединения"); 
        console.log("Cod: " + event.code + " причина: " + event.reason); 
    } 
}

socket.onmessage = function(message){ 
    message = JSON.parse(message.data); 

    switch(message.type){ 
    case "userNotFound": 
        if(confirm("Такого пользователя не существует. Хотите создать его?")){ 
            var obj = {"password": message.password, "type":"newUser", "login": message.login}; 
            socket.send(JSON.stringify(obj));
        }
        break
    case "wrongPassword":
        alert("Неверный пароль");
        break;
    case "enter":
            window.localStorage.setItem("bulLogin", true); 
            window.location.href="/main";
            break;
    } 
} 