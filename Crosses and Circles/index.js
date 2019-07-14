class Field{
    constructor(){
        this.size = 1
        this.cellSize = 30
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        this.dataField = []
        this.currentPlayerCross = true
    }
    Generate(n){
        this.size = n
        this.canvas.height = n * this.cellSize
        this.canvas.width = n * this.cellSize
        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'black'
        for(let i = 0; i < this.size; i++){
            this.dataField.push([])
            for(let j = 0; j < this.size; j++){
                this.dataField[i].push(new Cell(i * this.cellSize, j * this.cellSize, null))
                this.DrawCell(i, j, null)
            }
        }
        console.log(this.dataField)
    }
    DrawCell(x, y, isCross){
        this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize )
        if(isCross){
            //this.ctx.fillStyle = 'black'
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 3
            this.ctx.beginPath();
            this.ctx.moveTo(x + 2, y + 2)
            this.ctx.lineTo( (x + this.cellSize - 2), (y + this.cellSize - 2))
            //this.ctx.stroke()
            this.ctx.moveTo(x + this.cellSize - 2, y + 2)
            this.ctx.lineTo(x + 2, y + this.cellSize - 2)            
            this.ctx.closePath()
            this.ctx.stroke()
            this.ctx.lineWidth = 1
            console.log("CROSS AT " + x + ' ' + y)
        }
        else if(isCross === false){
            this.ctx.fillStyle = 'black'
            this.ctx.strokeStyle = 'black'
            this.ctx.strokeWidth = 3
            this.ctx.arc( x + 0.5 * this.cellSize, y + 0.5 * this.cellSize, this.cellSize / 2 - 1, 0, Math.PI * 2, true)
            this.ctx.lineWidth = 1
            console.log('@', x + 0.5 * this.cellSize, y + 0.5 * this.cellSize)
            console.log("ZERO AT " + x + ' ' + y)
            this.ctx.fill()
        }
    }
    Clear(){
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.height)
        this.dataField = []
    }
    Step(x, y, isCross){
        if(this.dataField[x][y].isCross == null){
            if(isCross == true){
                this.dataField[x][y].isCross = true
                this.DrawCell(x * this.cellSize, y * this.cellSize, true)
            }
            else{
                this.dataField[x][y].isCross = false
                this.DrawCell(x * this.cellSize, y * this.cellSize, false)
            }
        }
    }

    checkVictory() {
        // Проверка вертикали
        var n = this.dataField.length
        for(let i = 0; i < n; i++) {
            var count
            var current = this.dataField[i][0].isCross
            if(current == null) count = 0 
            else count = 1

            for(var j = 1; j < n; j++) {
                if(current == null) {
                    count = 0
                    continue
                }

                if(this.dataField[i][j].isCross == current) {
                    count++
                    if(count == 3) return current
                } else {
                    count = 0
                    current = this.dataField[i][j]
                }
            }
        }

        // Проверка горизонтали
        for(let j = 0; j < n; j++) {
            var count
            var current = this.dataField[0][j].isCross
            if(current == null) count = 0 
            else count = 1

            for(var i = 1; i < n; i++) {
                if(current == null) {
                    count = 0
                    continue
                }

                if(this.dataField[i][j].isCross == current) {
                    count++
                    if(count == 3) return current
                } else {
                    count = 0
                    current = this.dataField[i][j]
                }
            }
        }

        // ПРоверка диагоналей
        current = this.dataField[0][0].isCross
        
        if(current == null) count = 0 
            else count = 1

        for(let i = 1; i < n; i++){
           
                if(current == null) {
                    count = 0
                    continue
                }

                if(this.dataField[i][i].isCross == current) {
                    count++
                    if(count == 3) return current
                } else {
                    count = 0
                    current = this.dataField[i][i]
                }
        }

        current = this.dataField[n - 1][0].isCross
        
        if(current == null) count = 0 
            else count = 1

        for(let i = n - 2; i >= 0; i--){
           
                if(current == null) {
                    count = 0
                    continue
                }
                console.log(i, n - 1 - i)

                if(this.dataField[i][n - 1 - i].isCross == current) {
                    count++
                    if(count == 3) return current
                } else {
                    count = 0
                    current = this.dataField[i][n - 1 - i]
                }
        }
    }
}
class Cell{
    constructor(x = 0, y = 0, isCross = false){
        this.x = x
        this.y = y
        this.isCross = isCross
    }
}

var field = new Field();
field.Generate(Number(prompt("ENTER FIELD SIZE", "3")));
field.canvas.addEventListener('mouseup', function(e){
    let clickX = Math.floor((e.pageX - e.target.offsetLeft) / field.cellSize)
    let clickY = Math.floor((e.pageY - e.target.offsetTop) / field.cellSize)
    field.Step(clickX, clickY, field.currentPlayerCross)
    field.currentPlayerCross = !field.currentPlayerCross
    if(field.checkVictory() === true){
        if(confirm("FIRST PLAYER WINS! REPLAY?") === true){
            field.Clear()
            field.Generate(Number(prompt("ENTER FIELD SIZE", "3")));
            field.currentPlayerCross = true
        }
    }
    else if(field.checkVictory() === false){
        if(confirm("SECOND PLAYER WINS! REPLAY?") === true){
            field.Clear()
            field.Generate(Number(prompt("ENTER FIELD SIZE", "3")));
            field.currentPlayerCross = true
        }
    }
    console.log(field.checkVictory())
})