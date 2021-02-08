let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let data = [];
let values = 10;
let speed = 250;

let go = false;

let count = 0;
let countOut = document.getElementById("count");
let sortType = document.getElementById("sortType");
let valuesSlider = document.getElementById("valuesSlider");
var valuesOut = document.getElementById("valuesOut");
valuesOut.innerHTML = "Values: " + valuesSlider.value;
valuesSlider.oninput = function() {
    valuesOut.innerHTML = "Values: " + this.value;
    values = this.value;
}
let speedSlider = document.getElementById("speedSlider");
var speedOut = document.getElementById("speedOut");
speedOut.innerHTML = "Speed: " + speedSlider.value;
speedSlider.oninput = function() {
    speed = 500 - this.value;
    speedOut.innerHTML = "Speed: " + speed;
}

const timer = ms => new Promise(res => setTimeout(res, ms));

let algorithms = [
    bogoSort,
    bubbleSort
]
function start() {
    count = 0;
    go = true;
    let algorithm = sortType.value;
    console.log(algorithm);
    algorithms[sortType.value]();
}

function genData() {
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
    let blockWidth = width / d.length;
    let x = 0;
    let y;
    for (i = 0; i < d.length; i++) {
        let blockHeight = d[i]/d.length * height;
        y = height - blockHeight;
        c.fillRect(x, y, blockWidth, blockHeight);
        //console.log(x, y, blockWidth, blockHeight);
        x += blockWidth;
    }
}

async function bubbleSort() {
    for (i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {
            let temp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = temp;
            await timer(speed);
            count++;
            countOut.innerHTML = count;
            draw(); 
        }
    }
    
    if (!check()) {
        bubbleSort();
    }
}

function check() {
    for (i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {
            return false;
        }
    }
    return true;
}

async function bogoSort() {
    await timer(speed);
    count++;
    countOut.innerHTML = count;
    shuffleArray();
    if (!check() & go) {
        bogoSort();
    }
}



