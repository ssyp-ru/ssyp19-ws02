var context = new window.AudioContext(); /*window.OfflineAudioContext()*/
var source;
var destination = context.destination; 
var buffer = [];
var arr = [];
var oscillator;

var filters = []
var track = []

var timerID = null;

var analyser = context.createAnalyser();

var $canvas;
let drumCanv = document.getElementById('drumCanv');
let midiCanv = document.getElementById('midiCanv');
let drumctx = drumCanv.getContext('2d');
let midictx = midiCanv.getContext('2d');

const ip = document.location.host // 127.0.0.3:3000
const socket = new WebSocket("ws://" + ip)
console.log(ip)

var downButs = [{x:0,y:0,sound:130.82},{x:70,y:0,sound:147.83},{x:140,y:0,sound:164.81},{x:210,y:0,sound:174.62},
        {x:280,y:0,sound:196},{x:350,y:0,sound:220},{x:420,y:0,sound:246.96},{x:490,y:0,sound:261.63},
        {x:560,y:0,sound:293.66},{x:630,y:0,sound:329.63},{x:700,y:0,sound:349.23},{x:770,y:0,sound:392},
        {x:840,y:0,sound:440},{x:910,y:0,sound:493.88},{x:980,y:0,sound:523.25}/**/,{x:1050,y:0,sound:587.32},
        {x:1120,y:0,sound:659.26},{x:1190,y:0,sound:698.46},{x:1260,y:0,sound:784},{x:1330,y:0,sound:880},{x:1400,y:0,sound:987.75}]

var upButs = [{x:45,y:0,sound:138.59},{x:115,y:0,sound:155.56},
        {x:255,y:0,sound:185},{x:325,y:0,sound:207},{x:395,y:0,sound:233.08},
        {x:535,y:0,sound:277.18},{x:605,y:0,sound:311.13},{x:745,y:0,sound:369.99},
        {x:815,y:0,sound:415.30},{x:885,y:0,sound:466.16}/**/,{x:1025,y:0,sound:554.36},
        {x:1095,y:0,sound:622.26},{x:1235,y:0,sound:739.98},{x:1305,y:0,sound:830.60},{x:1375,y:0,sound:932.32}]

var drumButs = [[{x:0,y:0,sound:null},{x:100,y:0,sound:null},{x:200,y:0,sound:null},{x:300,y:0,sound:null}],
        [{x:0,y:100,sound:null},{x:100,y:100,sound:null},{x:200,y:100,sound:null},{x:300,y:100,sound:null}],  
        [{x:0,y:200,sound:null},{x:100,y:200,sound:null},{x:200,y:200,sound:null},{x:300,y:200,sound:null}],
        [{x:0,y:300,sound:null},{x:100,y:300,sound:null},{x:200,y:300,sound:null},{x:300,y:300,sound:null}]]

function drawMIDI(downButs, upButs){
        
        midiCanv.height = 400;
        midiCanv.width = 1470;
        
        midictx.fillStyle = 'black'
        
        for (let d of downButs){
                midictx.strokeRect(d.x, d.y, 70, 400);
        }
        for (let d of upButs){
                
                midictx.fillRect(d.x, d.y, 65, 250);
        }
}
function drawDrumPad(drumButs){
        
        drumCanv.height = 400;
        drumCanv.width = 400;
        
        let k = 1;

        for (let i in drumButs){
                for (let j in drumButs[i]){
                        drumctx.fillStyle = 'black'
                        drumctx.strokeRect(drumButs[i][j].x, drumButs[i][j].y, 100, 100);
                        drumctx.fillStyle = 'blue'
                        drumctx.fillRect(drumButs[i][j].x+10, drumButs[i][j].y+10, 80, 80);
                        loadSoundFile(k, i, j);
                        k++;
                }
        }
}
function createSound(buffer){
        source = context.createBufferSource();
        source.buffer = buffer;
        
        //source.connect(context.destination);
        createEQ(source)
        addEqEvents()

        return source;
}
function loadSoundFile(url, x, y) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', "./data/samples/"+url+".wav", true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) {
            context.decodeAudioData(this.response,
            function(decodedArrayBuffer) {
    
              buffer.push(decodedArrayBuffer);
              console.log("succeed loading: ", url, x, y)
                
              drumButs[x][y].sound = createSound(decodedArrayBuffer);
              drumButs[x][y].sound.onended = () => {
                        console.log("@")
                        //drumButs[x][y].sound
              }


            }, function(e) {
                  console.log('Error decoding file', e);
              });
            };
      xhr.send();
}
    
socket.onopen = function() {
    console.log("Соеденение установлено")
    
    $canvas = $("#visualizer")
    console.log($canvas)
   
        loop()

    drawDrumPad(drumButs)
    drawMIDI(downButs, upButs)



drumCanv.addEventListener('mousedown', function (e) {
    let x = Math.floor((e.pageX - e.target.offsetLeft) / 100);
    let y = Math.floor((e.pageY - e.target.offsetTop) / 100) ;

        drumButs[x][y].sound = createSound(buffer[y*4+x]);
        drumButs[x][y].sound.onended = function() {
                //onClick();
        }
       // onClick();
        drumButs[x][y].sound.start(0)

    //TODO: add sound pack to drum pad
});

midiCanv.addEventListener("mouseup", function() {
        oscillator.stop()
})
drumCanv.addEventListener("mouseup", function() {
        //onClick()
})
midiCanv.addEventListener('mousedown', function (e) {
        let y = Math.floor((e.pageY - e.target.offsetTop)) ;
        let x = null;

        if(y < 250){
                for (let i in upButs){
                        if((e.pageX - e.target.offsetLeft) >= upButs[i].x 
                        && (e.pageX - e.target.offsetLeft) <= upButs[i].x + 65){
                                x = i;
                                oscillator = context.createOscillator();
                                oscillator.type = 'sine';
                                oscillator.frequency.value = upButs[i].sound;
                                //oscillator.connect(destination);
                                oscillator.onended = function() {
                                        delete oscillator
                                }       
                               // onClick()           
                               createEQ(oscillator)
                               addEqEvents()              
                                oscillator.start()
                                break;
                        }
                }
        }
        else {
                x = Math.floor((e.pageX - e.target.offsetLeft) / 70);
                oscillator = context.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.value = downButs[x].sound;
               // oscillator.connect(destination);
                oscillator.onended = function() {
                        delete oscillator
                }               
                //onClick();
                createEQ(oscillator)
                               addEqEvents()
                oscillator.start()
        } 
    });
}







// Getting messages
socket.onmessage = function(message) {
    message = JSON.parse(message)
    switch(message.type) {
        case "message":
            
            break;
    }
}

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    }
    else {
        console.log('Обрыв соединения');
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }
}

function sound(buffer) {
        source = audioContext.createBufferSource();
        source.buffer = buffer;
        analyser = audioContext.createAnalyser();
        createEQ(source)
        addEqEvents()
    }

function filter(type, value) {
        var filterNode = context.createBiquadFilter()
        filterNode.type = type
        filterNode.frequency.value = value
        filterNode.frequency.Q = 0.5
        filterNode.gain.value = 0
        return filterNode
    }
    
function createEQ(src) {
        var f1 = filter("highpass", 60)
        var f2 = filter("peaking", 230)
        var f3 = filter("peaking", 910)
        var f4 = filter("peaking", 3000)
        var f5 = filter("peaking", 10000)
        var f6 = filter("lowpass", 15000)
        filters = [f1, f2, f3, f4, f5, f6]
        
        src.connect(f1)
        for (let i = 0; i < filters.length - 1; i++) {
                filters[i].connect(filters[i + 1])
        }
        f6.connect(analyser);
        analyser.connect(destination);
    }
    
    function addEqEvents () {
        let freqs = [60, 230, 910, 3000, 10000, 15000]
        for (let i = 0; i < filters.length; i++) {
            $("#freq"+freqs[i]).change((e) => {
                var curID = e.currentTarget.id
                var curValue = Number($("#" + curID).val())*(-2)
                var curFreq = Number(curID.slice(4))
                var place = freqs.indexOf(curFreq)
                filters[place].gain.value = curValue
            })
        }
    }
    
    function loop () {
        timerID = setInterval(()=>{
            $canvas.drawRect({
                fillStyle: "black",
                x: 0, y: 0,
                width: $canvas[0].width,
                height: $canvas[0].height,
                fromCenter: false
            })
            var array = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(array)
            for (let i = 1; i < 1025; i++) {
                $canvas.drawLine({
                    strokeStyle: "red",
                    strokeWidth: 1,
                    x1: i, y1: $canvas[0].height,
                    x2: i, y2: $canvas[0].height-array[i]
                })
            }
        }, 50)
    }
    
    function onClick(){
        if (!timerID) loop()
        else {
            clearInterval(timerID);
              timerID = null
            }
    }