function setAlarm(date) {
    const interval = setInterval(
        function () {
            checkAlarm(new Date(date), interval);
        }, 1000);
}


function checkAlarm(date, interval) {
    const current = new Date();
    if (date.getHours() === current.getHours() && date.getMinutes() === current.getMinutes()
        && date.getSeconds() === current.getSeconds() && date.getMonth() === current.getMonth()
        && date.getFullYear() === current.getFullYear()) {
        clearInterval(interval);
        alert('Ha llegado la hora, acepta para escucha la alarma');
        const audio = document.getElementById("audio");
        audio.volume = 1;
        audio.play();
    }
}

function startReloj() {
    date = new Date();

    setInterval(
        function () {
            let reloj = date.toTimeString().split(' ')[0];
            document.getElementById("reloj").innerHTML = reloj;
            date.setSeconds(date.getSeconds() + 1);
        }, 1000);
}
