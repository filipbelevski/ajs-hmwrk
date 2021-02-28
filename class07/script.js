const secondStopWatch = {
    seconds: 0,
    minutes: 0,
    intVal: null,

    init: function (cmd){
        switch (cmd) {
            case "start": 
                secondStopWatch.intVal = setInterval(() => {
                secondStopWatch.seconds += 1
                    if(secondStopWatch.seconds === 60){
                        secondStopWatch.minutes += 1;
                        secondStopWatch.seconds = 0;
                    }
                    stopWatchUi.updateDisplay(); //// return, dokolku ne povikam update display nema soodvetno da se updejtira html sekogas koga kje se izvrsi kodot, iako kje si se vrsi vo pozadina
                },20)
                break;
            case "stop":
                clearInterval(this.intVal);
                break;
            case "reset": 
                clearInterval(this.intVal);
                secondStopWatch.seconds = 0;
                secondStopWatch.minutes = 0;
                stopWatchUi.updateDisplay(); /// return
                break;
            default:
                break;
        }
    }
}

let stopWatchUi = {
    startBtn: document.getElementById("start"),
    stopBtn: document.getElementById("stop"),
    resetBtn: document.getElementById("reset"),
    timer: document.getElementById("timer"),
    
    updateDisplay:  () => {
        this.timer.innerHTML = `${secondStopWatch.minutes}:${secondStopWatch.seconds}`
    }
}

let stopWatchController = {
    start: stopWatchUi.startBtn.addEventListener('click',() => {
        secondStopWatch.init("start");
        stopWatchUi.startBtn.disabled = true;
    }),
    stop: stopWatchUi.stopBtn.addEventListener('click', () => {
        secondStopWatch.init("stop");
        stopWatchUi.startBtn.disabled = false;
    }),
    reset: stopWatchUi.resetBtn.addEventListener('click', () => {
        secondStopWatch.init("reset");
        stopWatchUi.startBtn.disabled = false
    })
}
