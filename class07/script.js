let stopWatch = {
    startBtn: document.getElementById("start"),
    stopBtn: document.getElementById("stop"),
    resetBtn: document.getElementById("reset"),
    
    seconds: 0,
    minutes: 0,
    intVal: null,
    init: function(){
        this.startBtn.addEventListener('click', () => {
            this.intVal = setInterval(() => {
                this.seconds += 1
                if(this.seconds === 60){
                    this.minutes += 1;
                    this.seconds = 0;
                }
                stopWatchUi.timer.innerHTML = `${this.minutes}:${this.seconds}`
            },20)
            this.startBtn.disabled = true
        }),
        
        this.stopBtn.addEventListener('click', () => {
            clearInterval(this.intVal)
            this.startBtn.disabled = false
        }),
        this.resetBtn.addEventListener('click', () => {
            clearInterval(this.intVal)
            this.seconds = 0
            this.minutes = 0
            stopWatchUi.timer.innerHTML = `${this.minutes}:${this.seconds}`
            this.startBtn.disabled = false
        })
    }
}

let stopWatchUi = {
    timer: document.getElementById("timer"),
}
stopWatch.init();
