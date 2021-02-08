let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
c.fillStyle = "aqua";
let width = canvas.width;
let height = canvas.height;

let data = [];
let values = 10;
let speed = 250;

let go = false;
let running = false;
let count = 0;
let countOut = document.getElementById("count");
let therOut = document.getElementById("ther");
let sortType = document.getElementById("sortType");
let valuesSlider = document.getElementById("valuesSlider");
var valuesOut = document.getElementById("valuesOut");
valuesOut.innerHTML = valuesSlider.value;
valuesSlider.oninput = function() {
    valuesOut.innerHTML = this.value;
    values = this.value;
}
let speedSlider = document.getElementById("speedSlider");
var speedOut = document.getElementById("speedOut");
speedOut.innerHTML = speedSlider.value;
speedSlider.oninput = function() {
    speed = 1000 - this.value;
    speedOut.innerHTML = speed;
}

const timer = ms => new Promise(res => setTimeout(res, ms));

let algorithms = [
    bogoSort,
    bubbleSort
]
function start() {
    go = true;
    if (!running) {
        count = 0;
        let algorithm = sortType.value;
        console.log(algorithm);
        algorithms[sortType.value]();
        if (sortType.value == 0) {
            therOut.innerHTML = factorialize(values) + " (!n)";
        } else if (sortType.value == 1) {
            therOut.innerHTML = (values * values) + " (n\xB2)";
        }
    }
}
genData();
function genData() {
    count = 0;
    countOut.innerHTML = 0;
    go = false;
    getData(values);
}

function getData(length) {
    data = [];
    for (i = 1; i <= length; i++) {
        data.push(i);
    }
    shuffleArray(data);
}

function shuffleArray() {
    for (var i = data.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    draw(data);
}

function draw() {
    let d = data;
    c.clearRect(0, 0, width, height);
    let blockW = (width / d.length);
    let gap = blockW * 0.05;
    let blockWidth = blockW * 0.95;
    let x = 0;
    let y;
    for (i = 0; i < d.length; i++) {
        let blockHeight = d[i]/d.length * height;
        y = height - blockHeight;
        c.fillRect(x, y, blockWidth, blockHeight);
        //console.log(x, y, blockWidth, blockHeight);
        x += blockWidth + gap;
    }
}

async function bubbleSort() {
    running = true;
    for (let i = 0; i < data.length; i++) {
        await timer(speed);
        count++;
        countOut.innerHTML = count;
        if (data[i] > data[i + 1]) {
            let temp = data[i + 1];
            data[i + 1] = data[i];
            data[i] = temp;   
            draw(); 
        }
    }
    
    if (!check() && go) {
        bubbleSort();
    }
    else {
        running = false;
        go = false;
    }
}

function check() {
    for (let i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {
            return false;
        }
    }
    return true;
}

async function bogoSort() {
    running = true;
    await timer(speed);
    count++;
    countOut.innerHTML = count;
    shuffleArray();
    if (!check() & go) {
        bogoSort();
    }
    else {
        running = false;
        go = false;
    }
}

function factorialize(num) {
  if (num < 0) 
        return -1;
  else if (num == 0) 
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}


