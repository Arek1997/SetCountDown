const timer = document.querySelector(".timer");

const resetBtn = document.querySelector(".btn-reset");
const stopBtn = document.querySelector(".btn-stop");
const goBtn = document.querySelector(".btn-go");

const inputHour = document.querySelector(".input-hour");
const inputMin = document.querySelector(".input-min");
const inputSec = document.querySelector(".input-sec");

// const defaultTime = "00:00:00";
// timer.textContent = defaultTime;

const counter = {
  hour: 0,
  min: 0,
  sec: 0,
};

let time = 0;
let running = false;
let counterTimer;

const startCounting = function () {
  const tick = function () {
    if (time >= 0 && !running) {
      const hour = String(Math.floor(time / 3600)).padStart(2, 0);
      const min = String(Math.floor((time % 3600) / 60)).padStart(2, 0);
      const sec = String((time % 3600) % 60).padStart(2, 0);

      timer.textContent = `${hour}:${min}:${sec}`;

      if (time === 0) {
        clearInterval(counterTimer);
        running;
      }

      time--;
      console.log(time);
    }
  };

  time = counter.hour * 60 * 60 + counter.min * 60 + counter.sec;

  tick();
  counterTimer = setInterval(tick, 1000);

  counter.hour = 0;
  counter.min = 0;
  counter.sec = 0;
};

goBtn.addEventListener("click", function () {
  if (inputHour.value >= 0) {
    counter.hour = Math.trunc(+`${inputHour.value}`);
    inputHour.value = "";
  } else if (inputHour.value < 0) {
    inputHour.value = "";
  }
  if (inputMin.value >= 0) {
    counter.min = Math.trunc(+`${inputMin.value}`);
    inputMin.value = "";
  } else if (inputMin.value < 0) {
    inputMin.value = "";
  }
  if (inputSec.value >= 0) {
    counter.sec = Math.trunc(+`${inputSec.value}`);
    inputSec.value = "";
  } else if (inputSec.value < 0) {
    inputSec.value = "";
  }

  clearInterval(counterTimer);
  // && inputHour.value <= 60
  // && inputMin.value <= 60
  // && inputSec.value <= 60
  startCounting();
});

stopBtn.addEventListener("click", function () {
  if (time > 0) {
    running = !running;
    stopBtn.textContent = "Start";
    if (!running) {
      running = false;
      stopBtn.textContent = "Stop";
    }
  }
});

resetBtn.addEventListener("click", function () {
  if (running === true) running = false;
  time = 0;
  clearInterval(counterTimer);
  timer.textContent = "00:00:00";
  stopBtn.textContent = "Stop";
});
