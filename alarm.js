// Alarm Section
let popup = document.getElementById("popup");
let body = document.getElementById("alarmBody");

document.getElementById("openSetAlarmBtn").addEventListener("click", openAlarmForm)

function openAlarmForm(){
    popup.classList.add("open-popup");
    popup.style.filter = "brightness(100%)";
    body.style.filter = "brightness(50%)";
}

document.getElementById("closeSetAlarmBtn").addEventListener("click", closeAlarmForm)

function closeAlarmForm(){
    popup.classList.remove("open-popup");
    body.style.filter = "brightness(100%)";
}