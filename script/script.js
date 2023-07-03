let minuteCounter = 2;
let secondCounter = 60;
let countDownInterval;

function onloadCountDown() {
  if (document.cookie !== "") {
    secondCounter = Number(Cookies.get("second"));
    minuteCounter = Number(Cookies.get("minute"));
    document.querySelector(".second-counter").innerHTML = secondCounter;
    document.querySelector(".minute-counter").innerHTML = minuteCounter;
    let previousSate = Cookies.get("state");
    if (previousSate === "started") {
      start();
    }
    // console.log(`minute: ${minuteCounter} , second: ${secondCounter}`);
  }
}

function start() {
  countDownInterval = setInterval(function () {
    if (secondCounter === 60 && minuteCounter > 0) {
      secondCounter -= 1;
      minuteCounter -= 1;
      document.querySelector(".second-counter").innerHTML = secondCounter;
      document.querySelector(".minute-counter").innerHTML = minuteCounter;
    } else if (secondCounter < 60 && secondCounter > 0 && minuteCounter > 0) {
      secondCounter -= 1;
      if (secondCounter >= 10) {
        document.querySelector(".second-counter").innerHTML = secondCounter;
      } else {
        document.querySelector(".second-counter").innerHTML =
          "0" + secondCounter;
      }
    } else if (secondCounter === 0 && minuteCounter > 0) {
      secondCounter = 59;
      minuteCounter -= 1;
      document.querySelector(".second-counter").innerHTML = secondCounter;
      document.querySelector(".minute-counter").innerHTML = minuteCounter;
    } else if (minuteCounter === 0 && secondCounter > 0) {
      secondCounter -= 1;
      if (secondCounter >= 10) {
        document.querySelector(".second-counter").innerHTML = secondCounter;
      } else {
        document.querySelector(".second-counter").innerHTML =
          "0" + secondCounter;
      }
    } else if (minuteCounter === 0 && secondCounter === 0) {
      clearInterval(countDownInterval);
      document.querySelector(".time-up-alert").style.display = "block";
    }
    Cookies.set("second", secondCounter);
    Cookies.set("minute", minuteCounter);
    // console.log(`minute: ${minuteCounter} , second: ${secondCounter}`);
    document.querySelector(".start-btn").disabled = true;
  }, 1000);
  Cookies.set("state", "started");
}

function pause() {
  clearInterval(countDownInterval);
  document.querySelector(".start-btn").disabled = false;
  Cookies.set("state", "paused");
}

function reset() {
  clearInterval(countDownInterval);
  minuteCounter = 2;
  secondCounter = 60;
  document.querySelector(".time-up-alert").style.display = "none";
  document.querySelector(".second-counter").innerHTML = "00";
  document.querySelector(".minute-counter").innerHTML = minuteCounter;
  document.querySelector(".start-btn").disabled = false;
  Cookies.set("second", secondCounter);
  Cookies.set("minute", minuteCounter);
  Cookies.set("state", "reset");
}
