// interval every second to lower a counter
// and reset it when it's at 0
const mysound = new Audio('default.mp3');
const time = document.querySelector('.time');
const numCycles = document.querySelector('.numCycles');
const counter = document.querySelector('.counter');
const start = document.querySelector('.START');
const stop = document.querySelector('.STOP');
const clear = document.querySelector('.CLEAR');

var minutes = seconds = lastTime = currentTimeLeft = pomodoroCycle = pomodoroChill = cycles = 0;

var startIt = pomodoro = false;

function startTimer() {
    if (minutes > -1 && (startIt || pomodoro)) {
        seconds--;

        if (seconds == -1) {
            minutes--;
            seconds = 59;
        }

        if(minutes > -1){
            counter.textContent = (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
            currentTimeLeft = (minutes * 60 + seconds) / 60;
            document.title = 'Time left: ' + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
        }
        if ( pomodoro && cycles > 0 && minutes == 0 && seconds == 0) {
            mysound.play();
            minutes = pomodoroChill;
            document.title = 'Time for chill!';
            cycles--;
            pomodoro = false;
            startIt = true;
        }
        if (cycles > 0 && !pomodoro && minutes == 0 && seconds == 0) {
            mysound.play();
            minutes = pomodoroCycle;
            document.title = 'Time for work!';
            pomodoro = true;
            startIt = false;
        }
    } 

    else if (minutes === -1) {
        counter.textContent = '';
        document.title = 'Time up!';
        mysound.play();
        clearInterval(intervalId);
        startIt = false;
    }
}


// when the button is clicked start the counter
$(document).ready(function(){
    
    $(".START").click(() => {
        if(startIt === false && time.value !== '') {
            minutes = Math.floor(time.value);
            seconds = Math.round(time.value % 1 * 60);
            counter.textContent = (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
            document.title = 'Timer on: ' + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
            time.value = '';
            intervalId = setInterval(startTimer,1000);
            startIt = true;
        }
    });

    $(".STOP").click(() => {
        time.value = currentTimeLeft;
        document.title = 'Timer stopped';
        clearInterval(intervalId);
        startIt = false;
    });

    $(".RESET").click(() => {
            counter.textContent = '';
            document.title = 'Timer off';
            time.value = lastTime;
            clearInterval(intervalId);
            startIt = pomodoro = false;
        }
    );

    $(".CLEAR").click(() => {
        counter.textContent = time.value = '';
        document.title = 'Timer Cleared';
        clearInterval(intervalId);
        startIt = pomorodo = false;
    });
});

function concFuncs(event) {
    pomodoroCycle = parseInt(event.value.substring(0,2));
    pomodoroChill = parseInt(event.value.substring(3));
    minutes = pomodoroCycle;
    if (event.value.length > 3) 
        pomodoro = true;
}

numCycles.addEventListener('keyup', (event) => {
    if (!numCycles.value.charAt(numCycles.value.length-1).match(/[0-9]/)) {
        numCycles.value = numCycles.value.replace(/[^0-9]/g, '');
    }
    cycles = parseInt(numCycles.value);
    // if enter is pressed
    if (event.keyCode === 13 && numCycles.value !== '' && numCycles.value !== '0' && pomodoro) 
        intervalId = setInterval(startTimer,1000);
})

// when the contents in time is changed then change the counter value
time.addEventListener('keyup', (event) => {

    lastTime = time.value;
    // if enter pressed then do
    if (event.keyCode === 13) {
        if(startIt === false){
            minutes = Math.floor(time.value);
            seconds = Math.round(time.value % 1 * 60);
            counter.textContent = (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
            // lastTime = time.value * 60;
            time.value = '';
            intervalId = setInterval(startTimer,1000);
            startIt = true;
        }
    }
});