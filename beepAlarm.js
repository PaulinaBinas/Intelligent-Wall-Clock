function beepAlarm() {
    "use strict";
    var i;
    for (i = 0; i < alarms.length; i++) {
        var hour = (alarms[i].time[0] * 10) + alarms[i].time[1];
        var minute = (alarms[i].time[2] * 10) + alarms[i].time[3];
        alarms[i].label = hour;
        displayAlarms();
        if (curHour > 12){
        curHour = curHour - 12;
        }
        if (hour === curHour && minute === curMinute) {
            alarms[i].label = "PLAYING";
            displayAlarms();
        }
    }