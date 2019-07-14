const ip = document.location.host;//127.0.0.3:8080
const socket = new WebSocket("ws://" + ip); 


if(!window.localStorage.getItem("bulLogin"))
    window.location.href="/";

var MAX = function(a, b){
    if(a > b)
        return a;
    else
        return b;
}

var MIN = function(a, b){
    if(a > b)
        return b;
    else 
        return a;
}

class Boat{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawBoatWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whiteBoat.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhite(x1, y1, x2, y2){
        if((y1 - y2 == 0) || (x1 - x2 == 0))
            return 1;
        else 
            return 0;
    }
    DrawBoatBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackBoat.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlack(x1, y1, x2, y2){
        if((y1 - y2 == 0) || (x1 - x2 == 0))
            return 1;
        else 
            return 0;
    }
}

class Horse{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawHorseWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whiteHorse.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhite(x1, y1, x2, y2){
        var distance = 5;
        if(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) == distance)
            return 1;
        else
            return 0;
    }
    DrawHorseBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackHorse.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlack(x1, y1, x2, y2){
        var distance = 5;
        if(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) == distance)
            return 1;
        else
            return 0;
    }
}

class Elephant{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawElephantWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whiteElephant.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhite(x1, y1, x2, y2){
        if(Math.pow(x1 - x2, 2) == Math.pow(y1 - y2, 2))
            return 1;
        else 
            return 0;
    }
    DrawElephantBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackElephant.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlack(x1, y1, x2, y2){
        if(Math.pow(x1 - x2, 2) == Math.pow(y1 - y2, 2))
            return 1;
        else 
            return 0;
    }
}

class King{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawKingWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whiteKing.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhite(x1, y1, x2, y2){
        var distance = 2;
        if(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= distance)
            return 1;
        else
            return 0;
    }
    DrawKingBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackKing.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlack(x1, y1, x2, y2){
        var distance = 2;
        if(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= distance)
            return 1;
        else
            return 0;
    }
}

class Queen{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawQueenWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whiteQueen.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhite(x1, y1, x2, y2){
        if((Math.pow(x1 - x2, 2) == Math.pow(y1 - y2, 2)) || (y1 - y2 == 0) || (x1 - x2 == 0))
            return 1;
        else
            return 0;
    }
    DrawQueenBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackQueen.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlack(x1, y1, x2, y2){
        if((Math.pow(x1 - x2, 2) == Math.pow(y1 - y2, 2)) || (y1 - y2 == 0) || (x1 - x2 == 0))
            return 1;
        else
            return 0;
    }
}

class Pawn{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    DrawPawnWhite(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/whitePawn.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionWhiteFirst(x1, y1, x2, y2){
        if((y2 - y1 <= 2) && (y2 - y1 > 0) && (x2 - x1 == 0))
            return 1;
        else 
            return 0;
    }
    DrawPawnBlack(x, y){
        this.x = x;
        this.y = y;
        $("canvas").drawImage({
            source: "figures/blackPawn.png",
            x: this.x, y: this.y
        });
    }
    IsValidPositionBlackFirst(x1, y1, x2, y2){
        if((y1 - y2 <= 2) && (y1 - y2 > 0) && (x2 - x1 == 0))
            return 1;
        else 
            return 0;
    }
}

class Field{
    constructor(){
        this.n = 8;
        this.size = 70;

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    
        this.canvas.height = this.n * this.size;
        this.canvas.width = this.n * this.size;
        
        this.dataOfField = [];
        this.currentPlayerIsCross = false;
    }

    GenerateField(){
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.n; j++){
                if(i % 2 == j % 2)
                    this.DrawSquare(i * this.size, j * this.size, "#FF0800");
                else
                    this.DrawSquare(i * this.size, j * this.size, "#A96E0F");
            }
        }
        
    }

    DrawSquare(x, y, color){
                this.color = color;
                this.x = x;
                this.y = y;
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    DrawFigures(){
        var boat = new Boat();
        var elephant = new Elephant();
        var pawn = new Pawn();
        var king = new King();
        var queen = new Queen();
        var horse = new Horse();

        for(let i = 0; i < this.n; i++){
            this.dataOfField.push([]);
            for(let j = 0; j < this.n; j++){
                this.dataOfField[i].push({
                    x: i * this.size,
                    y: j * this.size,
                    whatIs: "nothing",
                    dataColor: 0
                });
            }
        }
        
        for(let i = 0; i < this.n; i++){
            pawn.DrawPawnBlack(i * this.size + this.size / 2, 7 * this.size - this.size + this.size / 2);
            this.dataOfField[i][6] = {
                x: i * this.size + this.size / 2,
                y: 7 * this.size - this.size + this.size / 2,
                whatIs: "blackPawn",
                dataColor: 1
            };
            pawn.DrawPawnWhite(i * this.size + this.size / 2, this.size + this.size / 2);
            this.dataOfField[i][1] = {
                x: i * this.size + this.size / 2,
                y: this.size + this.size / 2,
                whatIs: "whitePawn",
                dataColor: 2
            };
            if((i == 0) || (i == 7)){
                boat.DrawBoatBlack(i * this.size + this.size / 2, 8 * this.size - this.size / 2);
                this.dataOfField[i][7] = {
                    x: i * this.size + this.size / 2,
                    y: 8 * this.size - this.size / 2,
                    whatIs: "blackBoat",
                    dataColor: 1
                };
                boat.DrawBoatWhite(i * this.size + this.size / 2, this.size / 2);
                this.dataOfField[i][0] = {
                    x: i * this.size + this.size / 2,
                    y: this.size / 2, 
                    whatIs: "whiteBoat",
                    dataColor: 2
                };
            }
            else if((i == 2) || (i == 5)){
                elephant.DrawElephantBlack(i * this.size + this.size / 2, 8 * this.size - this.size / 2);
                this.dataOfField[i][7] = {
                    x: i * this.size + this.size / 2,
                    y: 8 * this.size - this.size / 2,
                    whatIs: "blackElephant",
                    dataColor: 1
                };
                elephant.DrawElephantWhite(i * this.size + this.size / 2, this.size / 2);
                this.dataOfField[i][0] = {
                    x: i * this.size + this.size / 2,
                    y: this.size / 2,
                    whatIs: "whiteElephant",
                    dataColor: 2
                };
            }
            else if((i == 1) || (i == 6)){
                horse.DrawHorseBlack(i * this.size + this.size / 2, 8 * this.size - this.size / 2);
                this.dataOfField[i][7] = {
                    x: i * this.size + this.size / 2,
                    y: 8 * this.size - this.size / 2,
                    whatIs: "blackHorse",
                    dataColor: 1
                };
                horse.DrawHorseWhite(i * this.size + this.size / 2, this.size / 2);
                this.dataOfField[i][0] = {
                    x: i * this.size + this.size / 2,
                    y: this.size / 2,
                    whatIs: "whiteHorse",
                    dataColor: 2
                };
            }
            else if(i == 3){
                king.DrawKingBlack(i * this.size + this.size / 2, 8 * this.size - this.size / 2);
                this.dataOfField[i][7] = {
                    x: i * this.size + this.size / 2,
                    y: 8 * this.size - this.size / 2,
                    whatIs: "blackKing",
                    dataColor: 1
                };
                queen.DrawQueenWhite(i * this.size + this.size / 2, this.size / 2);
                this.dataOfField[i][0] = {
                    x: i * this.size + this.size / 2,
                    y: this.size / 2,
                    whatIs: "whiteQueen",
                    dataColor: 2 
                };
            }
            else if(i == 4){
                king.DrawKingWhite(i * this.size + this.size / 2, this.size / 2);
                this.dataOfField[i][0] = {
                    x: i * this.size + this.size / 2,
                    y: this.size / 2,
                    whatIs: "whiteKing",
                    dataColor: 2
                };
                queen.DrawQueenBlack(i * this.size + this.size / 2, 8 * this.size - this.size / 2);
                this.dataOfField[i][7] = {
                    x: i * this.size + this.size / 2,
                    y: 8 * this.size - this.size / 2,
                    whatIs: "blackQueen",
                    dataColor: 1
                };
            }
        } 
    }

    Movement(){
        
    }

    Update(){

    }
}


var currentPlayer = 2;
socket.onopen = function(){ 
    var boat = new Boat();
    var king = new King();
    var queen = new Queen();
    var elephant = new Elephant();
    var pawn = new Pawn();
    var horse = new Horse();
    var field = new Field();
    //window.localStorage.setItem("isCross", true);
    alert("Первыми всегда ходят белые");

    field.GenerateField();
    field.DrawFigures();
    var x1 = 0;
    var y1 = 0;
    field.canvas.addEventListener("mousedown", function(e){
        x1 = Math.floor((e.pageX - e.target.offsetLeft) / field.size);
        y1 = Math.floor((e.pageY - e.target.offsetTop) / field.size);
        console.log(x1, y1, field.dataOfField[x1][y1].whatIs);
    });
    field.canvas.addEventListener("mouseup", function(e){
        if(currentPlayer != field.dataOfField[x1][y1].dataColor){
            return
        }
        else{
            currentPlayer = (currentPlayer == 2 ? 1 : 2)
        }
        
        var x2 = Math.floor((e.pageX - e.target.offsetLeft) / field.size);
        var y2 = Math.floor((e.pageY - e.target.offsetTop) / field.size);
        console.log(x2, y2, field.dataOfField[x2][y2].whatIs);
        console.log(field.dataOfField[x2][y2].whatIs == "nothing")
        console.log(window.localStorage.getItem("isCross"));

        if((field.dataOfField[x2][y2].whatIs == "nothing") && 
        (((boat.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackBoat")) ||
        ((boat.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteBoat")) ||
        ((horse.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackHorse")) ||
        ((horse.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteHorse")) ||
        ((king.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackKing")) ||
        ((king.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteKing")) ||
        ((queen.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackQueen")) ||
        ((queen.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteQueen")) ||
        ((pawn.IsValidPositionBlackFirst(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackPawn")) ||
        ((pawn.IsValidPositionWhiteFirst(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whitePawn")) ||
        ((elephant.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackElephant")) ||
        ((elephant.IsValidPositionWhite(x1, y1, x2, y2)) && (field.dataOfField[x1][y1].whatIs == "whiteElephant")))){
            
            let c = field.dataOfField[x1][y1].whatIs;
            field.dataOfField[x1][y1].whatIs = field.dataOfField[x2][y2].whatIs;
            field.dataOfField[x2][y2].whatIs = c;
            let b = field.dataOfField[x1][y1].dataColor;
            field.dataOfField[x1][y1].dataColor = field.dataOfField[x2][y2].dataColor;
            field.dataOfField[x2][y2].dataColor = b; 
            console.log("drowing");
            
            if(field.dataOfField[x2][y2].whatIs == "blackBoat"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    boat.DrawBoatBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        boat.DrawBoatBlack(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }
            
            else if(field.dataOfField[x2][y2].whatIs == "blackElephant"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    elephant.DrawElephantBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        elephant.DrawElephantBlack(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }

           

            else if(field.dataOfField[x2][y2].whatIs == "blackHorse"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    horse.DrawHorseBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        horse.DrawHorseBlack(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }

            else if(field.dataOfField[x2][y2].whatIs == "blackKing"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    king.DrawKingBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        king.DrawKingBlack(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }

            else if(field.dataOfField[x2][y2].whatIs == "blackQueen"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    queen.DrawQueenBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        queen.DrawQueenBlack(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }

            else if(field.dataOfField[x2][y2].whatIs == "blackPawn"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    pawn.DrawPawnBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 1) || (y2 == 6))
                    pawn.DrawPawnBlack(field.dataOfField[x2][y2].x,
                        field.dataOfField[x2][y2].y);
                else if(y2 == 0){
                    field.dataOfField[x2][y2].whatIs = "blackQueen";
                    queen.DrawQueenBlack(field.dataOfField[x2][y2].x,
                        field.dataOfField[x2][y2].y);
                }
            }

           
        
            else if(field.dataOfField[x2][y2].whatIs == "whiteBoat"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    boat.DrawBoatWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        boat.DrawBoatWhite(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }
            else if(field.dataOfField[x2][y2].whatIs == "whiteElephant"){
                console.log(field.dataOfField[x2][y2].whatIs);
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    elephant.DrawElephantWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        elephant.DrawElephantWhite(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }
            else if(field.dataOfField[x2][y2].whatIs == "whiteHorse"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    horse.DrawHorseWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        horse.DrawHorseWhite(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }
            if(field.dataOfField[x2][y2].whatIs == "whitePawn"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    pawn.DrawPawnWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 0) || (y2 == 1) || (y2 == 6))
                    pawn.DrawPawnWhite(field.dataOfField[x2][y2].x,
                        field.dataOfField[x2][y2].y);
                else if(y2 == 7){
                    field.dataOfField[x2][y2].whatIs = "whiteQueen";
                    queen.DrawQueenWhite(field.dataOfField[x2][y2].x,
                        field.dataOfField[x2][y2].y);
                }
            }
            else if(field.dataOfField[x2][y2].whatIs == "whiteQueen"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    queen.DrawQueenWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        queen.DrawQueenWhite(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }
            else if(field.dataOfField[x2][y2].whatIs == "whiteKing"){
                if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                    king.DrawKingWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                        field.dataOfField[x2][y2].y + field.size / 2);
                else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                        king.DrawKingWhite(field.dataOfField[x2][y2].x,
                            field.dataOfField[x2][y2].y);
            }

            if(window.localStorage.getItem("isCross"))
                window.localStorage.setItem("isCross", false);
            else 
                window.localStorage.setItem("isCross", true);
            
            if(x1 % 2 == y1 % 2)
                field.DrawSquare(x1 * field.size, y1 * field.size, "#FF0800");
            else
                field.DrawSquare(x1 * field.size, y1 * field.size, "#A96E0F");
            field.currentPlayerIsCross = !field.currentPlayerIsCross;
        }
        else if((field.dataOfField[x2][y2].whatIs != "nothing") && 
        (field.dataOfField[x1][y1].dataColor != field.dataOfField[x2][y2].dataColor) &&
        (((boat.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackBoat")) ||
        ((boat.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteBoat")) ||
        ((horse.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackHorse")) ||
        ((horse.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteHorse")) ||
        ((king.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackKing")) ||
        ((king.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteKing")) ||
        ((queen.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackQueen")) ||
        ((queen.IsValidPositionWhite(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "whiteQueen")) ||
        ((((x2 == x1 - 1) || (x2 == x1 + 1)) && (y2 == y1 - 1)) && 
        (field.dataOfField[x1][y1].whatIs == "blackPawn")) ||
        ((((x2 == x1 - 1) || (x2 == x1 + 1)) && (y2 == y1 + 1)) && 
        (field.dataOfField[x1][y1].whatIs == "whitePawn")) ||
        ((elephant.IsValidPositionBlack(x1, y1, x2, y2)) && 
        (field.dataOfField[x1][y1].whatIs == "blackElephant")) ||
        ((elephant.IsValidPositionWhite(x1, y1, x2, y2)) && (
            field.dataOfField[x1][y1].whatIs == "whiteElephant"
        )))){
            if(field.dataOfField[x2][y2].whatIs == "blackKing"){
                alert("Выиграли белые");
                window.location.reload();
                return;
            }
            else if(field.dataOfField[x2][y2].whatIs == "whiteKing"){
                alert("Выиграли черные");
                window.location.reload();
                return;
            }
            field.dataOfField[x2][y2].whatIs = "nothing";
            field.dataOfField[x2][y2].dataColor = 0;
            let c = field.dataOfField[x1][y1].whatIs;
            field.dataOfField[x1][y1].whatIs = field.dataOfField[x2][y2].whatIs;
            field.dataOfField[x2][y2].whatIs = c;
            let b = field.dataOfField[x1][y1].dataColor;
            field.dataOfField[x1][y1].dataColor = field.dataOfField[x2][y2].dataColor;
            field.dataOfField[x2][y2].dataColor = b; 
            console.log(field.dataOfField[x1][y1].whatIs, field.dataOfField[x2][y2].whatIs);
            console.log(field.dataOfField[x1][y1].dataColor, field.dataOfField[x2][y2].dataColor);            
            if(x2 % 2 == y2 % 2)
                field.DrawSquare(x2 * field.size, y2 * field.size, "#FF0800");
            else
                field.DrawSquare(x2 * field.size, y2 * field.size, "#A96E0F");
            
                
                if(field.dataOfField[x2][y2].whatIs == "blackBoat"){
                    if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                        boat.DrawBoatBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                            field.dataOfField[x2][y2].y + field.size / 2);
                    else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                            boat.DrawBoatBlack(field.dataOfField[x2][y2].x,
                                field.dataOfField[x2][y2].y);
                }
                    
                    else if(field.dataOfField[x2][y2].whatIs == "blackElephant"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            elephant.DrawElephantBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                elephant.DrawElephantBlack(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
        
                   
        
                    else if(field.dataOfField[x2][y2].whatIs == "blackHorse"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            horse.DrawHorseBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                horse.DrawHorseBlack(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
        
                    else if(field.dataOfField[x2][y2].whatIs == "blackKing"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            king.DrawKingBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                king.DrawKingBlack(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
        
                    else if(field.dataOfField[x2][y2].whatIs == "blackQueen"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            queen.DrawQueenBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                queen.DrawQueenBlack(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
        
                    if(field.dataOfField[x2][y2].whatIs == "blackPawn"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            pawn.DrawPawnBlack(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 1) || (y2 == 6))
                            pawn.DrawPawnBlack(field.dataOfField[x2][y2].x,
                                field.dataOfField[x2][y2].y);
                        else if(y2 == 0){
                            field.dataOfField[x2][y2].whatIs = "blackQueen";
                            queen.DrawQueenBlack(field.dataOfField[x2][y2].x,
                                field.dataOfField[x2][y2].y);
                        }
                    }
        
                   
                
                
                    else if(field.dataOfField[x2][y2].whatIs == "whiteBoat"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            boat.DrawBoatWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                boat.DrawBoatWhite(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
                    else if(field.dataOfField[x2][y2].whatIs == "whiteElephant"){
                        console.log(field.dataOfField[x2][y2].whatIs);
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            elephant.DrawElephantWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                elephant.DrawElephantWhite(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
                    else if(field.dataOfField[x2][y2].whatIs == "whiteHorse"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            horse.DrawHorseWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                horse.DrawHorseWhite(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
                    else if(field.dataOfField[x2][y2].whatIs == "whitePawn"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            pawn.DrawPawnWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 0) || (y2 == 1) || (y2 == 6))
                            pawn.DrawPawnWhite(field.dataOfField[x2][y2].x,
                                field.dataOfField[x2][y2].y);
                        else if(y2 == 7){
                            field.dataOfField[x2][y2].whatIs = "whiteQueen";
                            queen.DrawQueenWhite(field.dataOfField[x2][y2].x,
                                field.dataOfField[x2][y2].y);
                        }
                    }
                    else if(field.dataOfField[x2][y2].whatIs == "whiteQueen"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            queen.DrawQueenWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                queen.DrawQueenWhite(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
                    else if(field.dataOfField[x2][y2].whatIs == "whiteKing"){
                        if((y2 != 7) && (y2 != 6) && (y2 != 0) && (y2 != 1))
                            king.DrawKingWhite(field.dataOfField[x2][y2].x + field.size / 2, 
                                field.dataOfField[x2][y2].y + field.size / 2);
                        else if((y2 == 7) || (y2 == 0) || (y2 == 1) || (y2 == 6))
                                king.DrawKingWhite(field.dataOfField[x2][y2].x,
                                    field.dataOfField[x2][y2].y);
                    }
        
            if(window.localStorage.getItem("isCross"))
                window.localStorage.setItem("isCross", false);
            else 
                window.localStorage.setItem("isCross", true);
                    
            if(x1 % 2 == y1 % 2)
                field.DrawSquare(x1 * field.size, y1 * field.size, "#FF0800");
            else
                field.DrawSquare(x1 * field.size, y1 * field.size, "#A96E0F");
            field.currentPlayerIsCross = !field.currentPlayerIsCross;
        }
    console.log(field.currentPlayerIsCross);
    if(!field.currentPlayerIsCross)
        alert("сейчас ходят белые");
    else 
        alert("сейчас ходят черные");
    });
}
    $("#out").click(function(){
        window.localStorage.clear();
        window.location.href="/";
    });


socket.onclose = function(event){

}

socket.onmessage = function(message) { 
    
}  