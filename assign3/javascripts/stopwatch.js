var stopwatchClock = function(){
	var startTime = 0;
	var lapTime = 0;
	
	var now = function(){
		return(new Date()).getTime();
	}
	this.startStopWatch = function(){
		startTime = startTime ? startTime : now();
	}
	this.stop = function(){
		lapTime = startTime ? lapTime + now() - startTime : lapTime;
		startTime = 0;
	}
	this.time = function(){
		return lapTime + (startTime ? now() - startTime : 0);
	}
}
var $time;
var stopwatch = new stopwatchClock();
var clockTimer;
function padTime(num, size){
	var s = "0000" + num;
	return s.substr(s.length - size);
}
function formatTime(time){
	var h = m = s = ms = 0;
	var newTime = '';
	
	h = Math.floor(time / (60 * 60 * 1000));
	time = time % (60 * 60 * 1000);
	m = Math.floor(time / (60 * 1000));
	time = time % (60 * 1000);
	s = Math.floor(time / 1000);
	ms = time % 1000;
	
	newTime = padTime(h,2) + ':' + padTime(m,2) + ':' + padTime(s,2) + ':' + padTime(ms,3);
	return newTime;
}
function show(){
	$time = document.getElementById('time');
	updateWatch();
}
function updateWatch(){
	$time.innerHTML = formatTime(stopwatch.time());
}
function startTheClock(){
	clockTimer = setInterval("updateWatch()", 1);
	stopwatch.startStopWatch();
}
function stop(){
	stopwatch.stop();
	clearInterval(clockTimer);
}