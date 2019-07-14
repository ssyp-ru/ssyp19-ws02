const ip = document.location.host
const socket = new WebSocket("ws://" + ip)

function SendName(){
    var obj = {"type":"NameMsg", "data" : $('#nameFld').val()}
    console.log(obj)
    socket.send(JSON.stringify(obj))
}
socket.onopen = function() {
    console.log("connected to " + ip)
    $('#enterNameBtn').click(function(e) {
        SendName()
    })
    $('#nameFld').keyup(function(e) {
        if(e.key === 'Enter'){
            SendName()
        }
    })
}

socket.onmessage = function(message){
    console.log(message)
    message = JSON.parse(message.data)
    console.log(message.data)
    if(message.type === 'RegistrationServerRespond'){
        switch(message.data){
            case "Success":
                alert("Hello, " + $('#nameFld').val())
                window.localStorage.setItem("name", $('#nameFld').val())
                window.location.href = 'game'
            break
            case "noSuchPlayer":
                if(confirm("We don't remember you." + 
                    " Would you like us to create new profile for you?")){
                    var obj = {"type":"RegistrationMessage", "data":true}
                    socket.send(JSON.stringify(obj))
                    alert("Registration done")
                    window.localStorage.setItem("name", $('#nameFld').val())
                    window.location.href = 'game'
                }
                else{
                    var obj = {"type":"RegistrationMessage", "data":false}
                }
        }
    }
}

socket.onclose = function(e) {
    console.log(e)
}