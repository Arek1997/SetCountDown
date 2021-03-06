const timer = document.querySelector(".timer");

const resetBtn = document.querySelector(".btn-reset");
const stopBtn = document.querySelector(".btn-stop");
const goBtn = document.querySelector(".btn-go");

const input_hour = document.querySelector(".input-hour");
const input_min = document.querySelector(".input-min");
const input_sec = document.querySelector(".input-sec");

const counter = {
  hour: 0,
  min: 0,
  sec: 0,
};

let time = 0;
let running = false;
let counterTimer;

const counting = function () {
  const tick = function () {
    if (time >= 0 && !running) {
      const hour = String(Math.floor(time / 3600)).padStart(2, 0);
      const min = String(Math.floor((time % 3600) / 60)).padStart(2, 0);
      const sec = String((time % 3600) % 60).padStart(2, 0);

      timer.textContent = `${hour}:${min}:${sec}`;

      if (time === 0) {
        clearInterval(counterTimer);
        running;
        goBtn.disabled = false;
        goBtn.classList.remove("disable");
      }

      time--;
      console.log(time);
    }
  };

  time = counter.hour * 60 * 60 + counter.min * 60 + counter.sec;

  tick();
  counterTimer = setInterval(tick, 1000);

  // counter.hour = 0;
  // counter.min = 0;
  // counter.sec = 0;
  counter.hour = counter.min = counter.sec = 0;
};

const start = function () {
  if (input_hour.value >= 0) {
    counter.hour = Math.trunc(+`${input_hour.value}`);
  } else if (input_hour.value < 0) {
    input_hour.value = "";
  }
  if (input_min.value >= 0) {
    counter.min = Math.trunc(+`${input_min.value}`);
  } else if (input_min.value < 0) {
    input_min.value = "";
  }
  if (input_sec.value >= 0) {
    counter.sec = Math.trunc(+`${input_sec.value}`);
  } else if (input_sec.value < 0) {
    input_sec.value = "";
  }

  clearInterval(counterTimer);

  reset();
  counting();

  // Switch off goBtn if timer counting down.
  if (timer.textContent !== "00:00:00") {
    goBtn.disabled = true;
    goBtn.classList.add("disable");
  }
};

// Reset timer
const reset = function () {
  if (running === true) running = false;
  // running = running === true ? false : "";
  time = 0;
  clearInterval(counterTimer);
  timer.textContent = "00:00:00";
  stopBtn.textContent = "Stop";
  input_hour.value = input_min.value = input_sec.value = "";
  goBtn.disabled = false;
  goBtn.classList.remove("disable");
};

// Start timer
goBtn.addEventListener("click", start);

// Stop timer
stopBtn.addEventListener("click", function () {
  if (time > 0) {
    running = !running;
    stopBtn.textContent = "Start";
    if (!running) {
      // running = false;
      stopBtn.textContent = "Stop";
    }
  }
});

resetBtn.addEventListener("click", reset);
