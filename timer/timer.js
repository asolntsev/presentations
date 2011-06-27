$(function() {
  var timerLengthMinutes = 5,
      timerWarningMinutes = 1,
      startTime, timer;

  function switchTo5MinutesPresentation() {
    timerLengthMinutes = 5;
    timerWarningMinutes = 1;
  }

  function switchTo40MinutesPresentation() {
    timerLengthMinutes = 40;
    timerWarningMinutes = 5;
  }

  function start() {
    startTime = new Date();
    $("#timerText").css("color", "black");
    $("#timerBar").css("background", "green");
    runTimer();
    timer = setInterval(runTimer, 1000);
    $("#startStopButton").text("stop");
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    $("#timerText").css("color", "gray");
    $("#timerBar").css("background", "gray");
    $("#startStopButton").text("start");
  }

  function startStop() {
    timer ? stop() : start();
  }

  function pad(numericValue) {
    return (numericValue < 10 ? '0' : '') + numericValue.toString();
  }

  var runTimer = function() {
    var now = new Date(),
        milliseconds = now.getTime() - startTime.getTime(),
        minutesGone = milliseconds / 60000,
        timerValue = pad(Math.floor(minutesGone)) + " / " + pad(timerLengthMinutes),
        barWidth = Math.round(milliseconds / 1000 / 60 / timerLengthMinutes * 1300);

    $("#timerText").text(timerValue);
    $("#timerBar").css("width", barWidth);

    if ((timerLengthMinutes - minutesGone <= timerWarningMinutes)) {
      $("#timerBar").css("background", "red");
      $("#timerText").css("color", "red");
    }
  };

  $(window).keypress(function(event) {
    if (event.charCode == 32 || event.charCode == 13) {
      startStop();
    }
  });
  $("#5minutes").click(switchTo5MinutesPresentation);
  $("#40minutes").click(switchTo40MinutesPresentation);
  $("#40minutes, #5minutes").click(function(){return false;});
});
