var timerLengthMinutes = 5;
var timerWarningMinutes = 1;

function switchTo5MinutesPresentation() {
	timerLengthMinutes = 5;
	timerWarningMinutes = 1;
}

function switchTo40MinutesPresentation() {
	timerLengthMinutes = 40;
	timerWarningMinutes = 5;
}

var startTime, timer;
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
	if (timer) {
		stop();
	}
	else {
		start();
	}
}

function pad(numericValue) {
	return (numericValue < 10) ? '0' + numericValue.toString() : numericValue.toString();
}

var runTimer = function() {
	var now = new Date();
	var milliseconds = now.getTime() - startTime.getTime();
	var minutesGone = milliseconds/60000;
	
	//var timerValue = pad(Math.floor(minutesGone)) + ":" + pad(Math.floor(milliseconds/1000)); // MIN:SEC
	var timerValue = pad(Math.floor(minutesGone)) + " / " + pad(timerLengthMinutes);
	$("#timerText").text(timerValue);

	$("#timerBar").css("width", Math.round(milliseconds/1000/60/timerLengthMinutes * 1300));
	if ((timerLengthMinutes - minutesGone <= timerWarningMinutes)) {
		$("#timerBar").css("background", "red");
		$("#timerText").css("color", "red");
	}
};

$(function() {
	$(window).keypress(function(event) {
		if (event.charCode == 32 || event.charCode == 13) {
			startStop();
		}
	});
});
