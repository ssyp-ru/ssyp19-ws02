
$(document).ready(function()
{
    $("<canvas id=\"cnv\"></canvas>").appendTo("body")
    $canvas = $("#cnv")
    $canvas[0].height = 600
    $canvas[0].width = 600
    var xkrug = 0;
    var ykrug = 0;
    var razmer = 30;
    var redkrug = 
    [
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height},
    {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height}
    ]
    var schot = 0;
    checkkos = function()
    {
        for(let i = 0;i < redkrug.length;i++)
        {
            var a = Math.sqrt(Math.pow(redkrug[i].x - xkrug, 2 ) + Math.pow(redkrug[i].y - ykrug, 2 ));
            if(a <= razmer + 10)
            {
                redkrug[i] = {x:Math.random()*$canvas[0].width, y:Math.random()*$canvas[0].height}
                $canvas.clearCanvas()
                schot ++;
                
                if(razmer < 100)
                {
                    razmer += 10;
                }
            }
        }
    }
    var drawCircles = function()
    {
        for(let i = 0;i < redkrug.length;i++)
        {
            $canvas.drawArc({
            fillStyle:"red",
                radius:10,
                x: redkrug[i].x,
                y: redkrug[i].y
            })
        }
    }
    var timerID=setInterval(
        function()
        {

                razmer -= 4;
        },1000)
    $(document).keypress(function(e) 
    {
        checkkos()    
        console.log(e.key)
        $canvas.drawText({
            fillStyle: "black",
            strokeStyle: "black",
            x:100, y:100,
            fontSize:48,
            fontFamily:"Arial",
            text:String(schot)


        })
        if(e.key == 'a')
        {
            xkrug -= 10; 
            $canvas.clearCanvas();
            $canvas.drawArc({
                fillStyle:"black",
                radius:razmer,
                x: xkrug, 
                y: ykrug
            })
            drawCircles()
        }
        if(e.key == 's')
        {
            ykrug += 10; 
            $canvas.clearCanvas();
            $canvas.drawArc({
                fillStyle:"black",
                radius:razmer,
                x: xkrug, 
                y: ykrug
            })
            drawCircles()
        }
        if(e.key == 'w')
        {
            ykrug -= 10; 
            $canvas.clearCanvas();
            $canvas.drawArc({
                fillStyle:"black",
                radius:razmer,
                x: xkrug, 
                y: ykrug
            })
            drawCircles()
        }
        if(e.key == 'd')
        {
            xkrug += 10; 
            $canvas.clearCanvas();
            $canvas.drawArc({
                fillStyle:"black",
                radius:razmer,
                x: xkrug, 
                y: ykrug
            })
            drawCircles()
        }
    })
    $canvas.drawArc(
    {
        fillStyle:"black",
        x: 100, y: 100,
        radius:50,
        start:0,
        end:360
    })
    // $canvas.drawImage(
    // {
    //     source:"unnamed.jpg",
    //     x:0,y:0,
    //     fromCenter:false,
    //     width: $canvas[0].width,
    //     height: $canvas[0].height
    // })
})
// var a = setTimout(function()
//     {
//      console.log("Hello")    
//     }, 1000)

    
    
    //clearInterval(timerID)