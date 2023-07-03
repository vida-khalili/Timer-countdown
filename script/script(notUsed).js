let count = 120;
let countDownInterval;
let minuteCounter;
let secondCounter;

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
    console.log(`minute: ${minuteCounter} , second: ${secondCounter}`);
  }
}

function start() {
  countDownInterval = setInterval(function () {
    count -= 1;
    if (count >= 0) {
      minuteCounter = Math.floor(count / 60);
      document.querySelector(".minute-counter").innerHTML = minuteCounter;
      if (count % 60 === 0) {
        secondCounter = 0;
        document.querySelector(".second-counter").innerHTML =
          "0" + secondCounter;
      } else if (count % 60 > 0 && minuteCounter !== 0) {
        secondCounter = count - minuteCounter * 60;
        if (secondCounter >= 10) {
          document.querySelector(".second-counter").innerHTML = secondCounter;
        } else {
          document.querySelector(".second-counter").innerHTML =
            "0" + secondCounter;
        }
      } else if (count % 60 > 0 && minuteCounter === 0) {
        secondCounter = count;
        if (secondCounter >= 10) {
          document.querySelector(".second-counter").innerHTML = secondCounter;
        } else {
          document.querySelector(".second-counter").innerHTML =
            "0" + secondCounter;
        }
      }
    } else {
      clearInterval(countDownInterval);
      document.querySelector(".time-up-alert").style.display = "block";
    }
    Cookies.set("count", count);
    Cookies.set("second", secondCounter);
    Cookies.set("minute", minuteCounter);
    console.log(`minute: ${minuteCounter} , second: ${secondCounter}`);
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
  count = 120;
  document.querySelector(".time-up-alert").style.display = "none";
  document.querySelector(".second-counter").innerHTML = "00";
  document.querySelector(".minute-counter").innerHTML = "2";
  document.querySelector(".start-btn").disabled = false;
  Cookies.set("count", count);
  Cookies.remove("minute");
  Cookies.remove("second");
  Cookies.set("state", "reset");
}
