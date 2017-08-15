function Alarm(label, time, day, vibrate, repeat) {
    "use strict";
    this.label = label;
    this.time = time;
    this.day = day;
    this.vibrate = vibrate;
    this.repeat = repeat;
    this.active = true;
}

var alarms = [];

function beep() {
    "use strict";
    var x = document.getElementById("myAudio"), hour, minute, curHour, curMinute, now, i;
    now = new Date();
    curHour = now.getHours();
    curMinute = now.getMinutes();
    for (i = 0; i < alarms.length; i = i + 1) {
        if ((alarms[i] != null) && (alarms[i].active == true)) {
            hour = alarms[i].time[0] + alarms[i].time[1];
            minute = alarms[i].time[3] + alarms[i].time[4];
            if (hour == curHour) {
                if(minute == curMinute) {
                    x.play();
                    displayAlarms(); 
                } 
            }
        }
    }
    setTimeout(beep, 100);
}

function displayAlarms() {
    "use strict";
    var i = 0, l = alarms.length, repeat, vibrate;
    document.getElementById('t').innerHTML = '';
    for (i; i <= l; i = i + 1) {
        if (alarms[i].repeat === true) {
            repeat = "Repeat";
        } else {
            repeat = "";
        }

        if (alarms[i].vibrate === true) {
            vibrate = "Vibrate";
        } else {
            vibrate = "";
        }
        
        if (alarms[i].active === true) {
            document.getElementById('t').innerHTML += "<hr><p><b>" + alarms[i].time + '</b> ' + alarms[i].label + ' ' + '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" onclick="changeStateAlarm(' + i + ')" checked><a id="delButton" onClick="deleteAlarm(' + i + ')" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a></p>';
        } else {
            document.getElementById('t').innerHTML += "<hr><p><b>" + alarms[i].time + '</b> ' + alarms[i].label + ' ' + '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" onclick="changeStateAlarm(' + i + ')"><a id="delButton" onClick="deleteAlarm(' + i + ')" class="ui-btn ui-corner-all ui-shadow ui-icon-delete ui-btn-icon-notext ui-btn-icon-right"></a></p>';
        }
    }
}

function changeStateAlarm(i) {
    "use strict";
    
    if (alarms[i].active === true) {
        alarms[i].active = false;
    } else {
        alarms[i].active = true;
    }
}

function alarmSet() {
    "use strict";
    /*global $ */
    $('#timePicker1').val(); //<- Get value
    var m = document.getElementById('m').checked, t = document.getElementById('tu').checked, w = document.getElementById('w').checked, th = document.getElementById('th').checked, f = document.getElementById('f').checked, s = document.getElementById('sa').checked, su = document.getElementById('su').checked, time = $('#timePicker1').val(), label = document.getElementById('label1').value, day = [m, t, w, th, f, s, su], repeat = document.getElementById('repeat').checked, l = alarms.length, vibrate = document.getElementById('vibrate').checked;
    alarms[l] = new Alarm(label, time, day, vibrate, repeat);

    displayAlarms();
}

function deleteAlarm(i) {
    alarms.splice(i,1);
    displayAlarms();
}

function updateClock() {
    "use strict";
    var today = new Date(), weekDay = today.getDay(), hour = today.getHours(), minute = today.getMinutes(), am = 'am';
    if (hour > 12) {
        am = 'pm';
        hour = hour - 12;
    }
    if (minute > 9 && hour > 9) {
        document.getElementById('time').getElementsByTagName('span')[0].textContent = hour + ":" + minute + ' ' + am;
    } else {
        if (minute < 10 && hour < 10) {
            document.getElementById('time').getElementsByTagName('span')[0].textContent = '0' + hour + ":" + '0' + minute + ' ' + am;
        }
        if (minute < 10 && hour > 9) {
            document.getElementById('time').getElementsByTagName('span')[0].textContent = hour + ":" + '0' + minute + ' ' + am;
        }
        if (hour < 10 && minute > 9) {
            document.getElementById('time').getElementsByTagName('span')[0].textContent = '0' + hour + ":" + minute + ' ' + am;
        }
    }
    setTimeout(updateClock, 1000);
}

beep();
updateClock();