const gameBoard = document.querySelector("#clockCanvas");
const ctx = gameBoard.getContext("2d");
const clockWidth = gameBoard.width;
const clockHeight = gameBoard.height;
const clockRadius = gameBoard.width / 2 - 40;
const minsHand = 0;
const hrsHand = 0;
const secsHand = 0;
const myTime = document.querySelector("#myTime");
const myDate = document.querySelector("#myDate");
let intervalID;
let hrs, mins, secs, day, monthName, year, dayName, am_pm;
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let minsArray = [];
let hrsArray = [];
let secsHandArray = [];
let minsHandArray = [];
let hrsHandArray = [];


clockStart();

function clockStart(){
    generateHrs();
    generateMins();
    generateHrHand();
    generateMinHand();
    generateSecHand();
    nextTick();
}

function nextTick(){
    intervalID = setInterval(() => {
        clearHand();
        displayDayTime();
        drawClock();
    }, 100);
}

function clearHand(){
    ctx.clearRect(0, 0, clockWidth, clockHeight);
}

function displayDayTime(){
    let date = new Date();

    year = date.getFullYear();
    monthName = date.getMonth();
    day = date.getDate();
    dayName = date.getDay();
    hrs = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();

    hrs = hrs % 12;
    am_pm = (hrs < 12) ? "AM" : "PM"; 

    // day = (day.toString().length == 1) ? "0" + day : day;
    // month = (month.toString().length == 1) ? "0" + month : month;
    // hrs = (hrs.toString().length == 1) ? "0" + hrs : hrs;
    // mins = (mins.toString().length == 1) ? "0" + mins : mins;
    // secs = (secs.toString().length == 1) ? "0" + secs : secs;

    myDate.textContent = `${daysOfWeek[dayName]}, ${months[monthName]} ${day}, ${year}`;
    myTime.textContent = `${(hrs.toString().length == 1) ? "0" + hrs : hrs}:` + 
                            `${(mins.toString().length == 1) ? "0" + mins : mins}:` +
                            `${(secs.toString().length == 1) ? "0" + secs : secs} ${am_pm}`;
}

function drawClock(){
    drawOuterCircle();
    drawHrs();
    drawMins();
    drawSecHand();
    drawMinHand();
    drawHrsHand();
    centerCircle();
}

function drawOuterCircle(){
    let clockOuterRadius = clockWidth / 2 - 10;
    ctx.fillStyle = "lightblue";
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(clockWidth / 2, clockHeight / 2, clockOuterRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function drawHrs(){
    let h = 12;
    for (let hr of hrsArray) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(h.toString(), hr.x, hr.y);
        h--;
    }
}

function drawMins(){
    let currentTime = 0;

    for (let i = 0; i < minsArray.length; i++){
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (i == currentTime){
            ctx.arc(minsArray[i].x, minsArray[i].y, 4, 0, 2 * Math.PI);
            currentTime += 5;
        }
        ctx.arc(minsArray[i].x, minsArray[i].y, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function generateHrs() {
    for (let i = 1; i <= 12; i++) {
        const theta = (2 * Math.PI / 12) * (i - 3);
        const x = (clockWidth / 2) + clockRadius * Math.cos(theta);
        const y = (clockHeight / 2 + 10) + clockRadius * Math.sin(theta);
        hrsArray.unshift({ x, y });
    }
}

function generateMins(){
    for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * 2 * Math.PI;
        const x = (clockWidth / 2) + (clockRadius - 20) * Math.sin(angle);
        const y = (clockHeight / 2) - (clockRadius - 20) * Math.cos(angle);
        minsArray.push({ x, y });
    }
}

function drawSecHand(){
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(clockWidth / 2, clockWidth / 2);
    ctx.lineTo(secsHandArray[secs].x, secsHandArray[secs].y); 
    ctx.stroke();
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(secsHandArray[secs].x, secsHandArray[secs].y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function drawMinHand(){
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(clockWidth / 2, clockWidth / 2);
    ctx.lineTo(minsHandArray[mins].x, minsHandArray[mins].y); 
    ctx.stroke();
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(minsHandArray[mins].x, minsHandArray[mins].y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function drawHrsHand(){
    // if (mins % 10 == 0){
    //     // ctx.lineTo(hrsHandArray[hrs].x, hrsHandArray[hrs].y); 
    // }
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(clockWidth / 2, clockWidth / 2);
    ctx.lineTo(hrsHandArray[hrs].x, hrsHandArray[hrs].y); 
    ctx.stroke();
    ctx.fill();

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(hrsHandArray[hrs].x, hrsHandArray[hrs].y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function generateSecHand(){
    for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * 2 * Math.PI;
        const x = (clockWidth / 2) + (clockRadius - 40) * Math.sin(angle);
        const y = (clockHeight / 2) - (clockRadius - 40) * Math.cos(angle);
        secsHandArray.push({ x, y });
    }
}

function generateMinHand(){
    for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * 2 * Math.PI;
        const x = (clockWidth / 2) + (clockRadius - 50) * Math.sin(angle);
        const y = (clockHeight / 2) - (clockRadius - 50) * Math.cos(angle);
        minsHandArray.push({ x, y });
    }
}

function generateHrHand(){
    for (let i = 1; i <= 12; i++) {
        const theta = (2 * Math.PI / 12) * (i - 3);
        const x = (clockWidth / 2) + (clockRadius - 60) * Math.cos(theta);
        const y = (clockHeight / 2 + 10) + (clockRadius - 60) * Math.sin(theta);
        hrsHandArray.unshift({ x, y });
    }

    // for (let i = 0; i < 60; i++) {
    //     const angle = (i / 60) * 2 * Math.PI;
    //     const x = (clockWidth / 2) + (clockRadius - 60) * Math.sin(angle);
    //     const y = (clockHeight / 2) - (clockRadius - 60) * Math.cos(angle);
    //     hrsHandArray.push({ x, y });
    // }
}

function centerCircle(){
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(clockWidth / 2, clockHeight / 2, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}