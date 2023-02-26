// Alarm Section
let alarmTime = document.getElementById("alarmTime");
let textTime = document.getElementById("textTime");
let textAmPm = document.getElementById("textAmPm");
let textDay = document.getElementById("textDay");
let popup = document.getElementById("popup");
let body = document.getElementById("alarmBody");
let doAlarmSection = document.getElementById("doAlarmSection");
let remainTime = document.getElementById("remainTime");
let date;
let alarmHours, alarmMinutes;
let selectedHour = document.getElementById("hours");
let selectedMins = document.getElementById("mins");
let alarmTitle = document.getElementById("titleText");
let hrs, mins, secs, day, monthName, year, dayName, am_pm;
let intervalID;
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let remainHour = 0;
let remainMinute = 0;
let timeRemain = 0;
let alarm;
let running = false;

runAlarm();

document.getElementById("openSetAlarmBtn").addEventListener("click", openAlarmForm);
document.getElementById("closeSetAlarmBtn").addEventListener("click", closeAlarmForm);
document.getElementById("closeForm").addEventListener("click", exitAlarm);
document.getElementById("deleteAlarm").addEventListener("click", deleteAlarm);

function openAlarmForm(){
    popup.classList.add("open-popup");
    popup.style.filter = "brightness(100%)";
    body.style.filter = "brightness(50%)";
    setUpTime();
}

function closeAlarmForm(){
    popup.classList.remove("open-popup");
    body.style.filter = "brightness(100%)";
    doAlarmSection.style.visibility = "visible";
    displayAlarmTime();
    setAlarm();
    running = true;
}

function exitAlarm(){
    popup.classList.remove("open-popup");
    body.style.filter = "brightness(100%)";
    running = false;
}

function deleteAlarm(){
    doAlarmSection.style.visibility = "hidden";
    running = false;
}

function setUpTime(){
    date = new Date();
    alarmHours = date.getHours();
    alarmMinutes = date.getMinutes();
    selectedHour.value = alarmHours;
    selectedMins.value = alarmMinutes;
    alarmTitle.value = "Alarm Title";
}

function runAlarm(){
    intervalID = setInterval(() => {
        displayDayTime();
        if (running){
            displayAlarmRemainTime();
        }
    }, 75);
}

function displayDayTime(){
    date = new Date();

    year = date.getFullYear();
    monthName = date.getMonth();
    day = date.getDate();
    dayName = date.getDay();
    hrs = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();
    am_pm = (hrs < 12) ? "AM" : "PM"; 
    hrs = hrs % 12;

    textDay.textContent = `${daysOfWeek[dayName]}, ${months[monthName]} ${day}, ${year}`;
    textTime.textContent = `${(hrs.toString().length == 1) ? "0" + hrs : hrs}:` + 
                            `${(mins.toString().length == 1) ? "0" + mins : mins}:` +
                            `${(secs.toString().length == 1) ? "0" + secs : secs}`;
    textAmPm.textContent = am_pm;
}

function displayAlarmTime(){
    let tempHour = selectedHour.value;
    let tempMin = selectedMins.value;
    let tempAmPm = (tempHour < 12) ? "AM" : "PM";
    tempHour = tempHour % 12;
    alarmTime.textContent = `${(tempHour.toString().length == 1) ? "0" + tempHour : tempHour}:` + 
                            `${(tempMin.toString().length == 1) ? "0" + tempMin : tempMin} ` +
                            `${tempAmPm}`;
}

function setAlarm(){
    let now = new Date();
    alarm = new Date();
    alarm.setHours(selectedHour.value);
    alarm.setMinutes(selectedMins.value);
    if (alarm.getTime() < now.getTime()) {
        alarm.setDate(alarm.getDate() + 1);
    }
}

function displayAlarmRemainTime(){
    date = new Date();
    let diff = alarm.getTime() - date.getTime();
    remainHour = Math.floor(diff / 3600000);
    remainMinute = Math.round((diff / 60000) % 60);
    if (remainHour == 0 && remainMinute == 0){
        running = false;
        doAlarmSection.style.visibility = "hidden";
    }
    remainTime.textContent = `${remainHour} hour and ${remainMinute}`;
    
}