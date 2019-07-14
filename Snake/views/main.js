const ip = document.location.host
const socket = new WebSocket("ws://" + ip)
var isRunning = false
var toGrow = false
var foodArr = []
var record = 0
var GameTimer
var snake
class Snake{
    constructor(headX = 20, headY = 25, len = 5){
        this.length = len
        this.dir = "right"
        this.segmentArr = [new Segment(headX, headY, "head")]
        for(let i = 0; i < len - 2; i++){
            this.segmentArr.push(new Segment(headX - i - 1, headY))
        }
        this.segmentArr.push(new Segment(headX - len + 1, headY, "tail", "right"))
    }
    Move(){
        if(toGrow == false){
            for(let i = this.length - 1; i >= 1; i--){
                this.segmentArr[i].x = this.segmentArr[i - 1].x
                this.segmentArr[i].y = this.segmentArr[i - 1].y
                this.segmentArr[i].type = this.segmentArr[i - 1].type
            }
            this.segmentArr[1].type = 'body'
            if(this.dir === "right"){this.segmentArr[0].x += 1}
            else if(this.dir === "left"){this.segmentArr[0].x -= 1}
            else if(this.dir === "up"){this.segmentArr[0].y -= 1}
            else if(this.dir === 'down'){this.segmentArr[0].y += 1}
        }
        else{
            this.segmentArr[0].type = 'body'
            console.log("(1)", this.segmentArr)

            switch(this.dir){
                case "right":
                    this.segmentArr.unshift(new Segment(this.segmentArr[0].x + 1, this.segmentArr[0].y, 'head'))
                break
                case "left":
                    this.segmentArr.unshift(new Segment(this.segmentArr[0].x - 1, this.segmentArr[0].y, 'head'))
                break
                case "up":
                    this.segmentArr.unshift(new Segment(this.segmentArr[0].x, this.segmentArr[0].y - 1, 'head'))
                break
                case "down":
                    this.segmentArr.unshift(new Segment(this.segmentArr[0].x, this.segmentArr[0].y + 1, 'head'))
                break
            }
            toGrow = false
            console.log("(2)", this.segmentArr)
        }
        this.Draw()
    }
    Rotate(dir){
        if(this.direction != dir){
            if (!( (this.dir === 'right' && dir === 'left') || (this.dir === 'left' && dir == 'right') || 
                (this.dir === 'up' && dir == 'down') || (this.dir === 'down' && dir === 'up') ) ){
            this.dir = dir
            }
        }
    }
    Draw(){
        $('#gameCanvas').clearCanvas()
        $('#gameCanvas').drawRect({fillStyle:'darkblue', x:this.segmentArr[0].x * 10, y:this.segmentArr[0].y * 10, height:10, width:10, fromCenter:false})
        for(let i = 1; i < this.length; i++){
            $('#gameCanvas').drawRect({fillStyle:'gray', x:this.segmentArr[i].x * 10, y:this.segmentArr[i].y * 10,  height:10, width:10, fromCenter:false})
        }

        for(let i = 0; i < foodArr.length; i++){
            if( (this.segmentArr[0].x == foodArr[i].x) && (this.segmentArr[0].y == foodArr[i].y)){
                foodArr[i].Eat()
                this.Grow()
            }
            $('#gameCanvas').drawArc({fillStyle:'red', x:foodArr[i].x * 10 + 5, y:foodArr[i].y * 10 + 5, radius:5})
        } 
        if(isRunning == false){
            $('#gameCanvas').drawRect({fillStyle:'black', x:125, y:125, height:250, width:250, fromCenter:false})
            $('#gameCanvas').drawRect({fillStyle:'white', x:130, y:130, height:240, width:240, fromCenter:false})
            $('#gameCanvas').drawText({fillStyle:'black', strokeStyle:'black', strokeWidth:3, x:250, y:250, fontSize:20, text:"Press 'SPACE' to play"})
        }
        for(let i = 1; i < this.segmentArr.length; i++){
            if( ( (this.segmentArr[0].x == this.segmentArr[i].x) && (this.segmentArr[0].y == this.segmentArr[i].y) ) || (this.segmentArr[0].y > 50) ||
            (this.segmentArr[0].x > 50) || (this.segmentArr[0].y < 0) || (this.segmentArr[0].x < 0) ){
                GameOver()
                break
            }
        }
        $('#scoreCanvas').clearCanvas()
        $('#scoreCanvas').drawText({fillStyle:'black', strokeStyle:'black', strokeWidth:2, x:150, y:10, fontSize:18, text:('Score : ' + (this.length - 5) )})
        console.log(foodArr)
    }
    Grow(){
        toGrow = true
        this.length += 1
        console.log("toGrow: ", toGrow)
    }
}
class Segment{
    constructor(x = 0, y = 0, type = "body"){
        this.x = x
        this.y = y
        this.type = type
    }
}
class Food{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    Eat(){
        this.x = Math.round(Math.random() * 50)
        this.y = Math.round(Math.random() * 50)
    }
}

function GameOver(){
    clearInterval(GameTimer)
    $('#gameCanvas').drawRect({fillStyle:'black', x:125, y:125, height:250, width:250, fromCenter:false})
    $('#gameCanvas').drawRect({fillStyle:'white', x:130, y:130, height:240, width:240, fromCenter:false})
    $('#gameCanvas').drawText({fillStyle:'black', strokeStyle:'black', strokeWidth:3, x:250, y:250, fontSize:20, text:"GAME OVER"})
    if( (snake.length - 5) > record){
        alert("YOU GOT NEW RECORD! NEW SCORE IS " + (snake.length - 5) )
        var obj = {"type":"NewRecord", "data":[(snake.length - 5), window.localStorage.getItem("name")]}
        socket.send(JSON.stringify(obj))
        record = snake.length - 5
    }
    else{
        alert("Game over")
    }
    snake = new Snake()
}
socket.onopen = function(){
    if(window.localStorage.getItem("name") == null){
        window.location.href = '/'
    }
    snake = new Snake()
    snake.Draw()
    for(let i = 0; i < 20; i++){
        foodArr.push(new Food(Math.round(Math.random() * 50), Math.round(Math.random() * 50)))
    }
    $(document).keyup(function(e){
        console.log(e.key)
        switch(e.key){
            case 'w':
                snake.Rotate('up')
            break
            case 's':
                snake.Rotate('down')
            break
            case 'd':
                snake.Rotate('right')
            break
            case 'a':
                snake.Rotate('left')
            break
            case ' ':
                GameTimer = setInterval(() => {
                     snake.Move()
                }, 150)
                isRunning = true
            break
            case 'Escape':
                clearInterval(GameTimer)
                isRunning = false
                snake.Draw()
            break
        }
        console.log(snake.segmentArr)
    })
}

socket.onmessage = function(message){
    message = JSON.parse(message)
    if(message.type == "RecordMessage"){
        record = message.data
    }
}