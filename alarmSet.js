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
            document.getElementById('t').innerHTML += "<hr><p><b>" + alarms[i].time + '</b> ' + alarms[i].label + ' ' + '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" onclick="changeStateAlarm(' + i + ')" checked></p>';
        } else {
            document.getElementById('t').innerHTML += "<hr><p><b>" + alarms[i].time + '</b> ' + alarms[i].label + ' ' + '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" onclick="changeStateAlarm(' + i + ')"></p>';
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
///document.getElementById('t').getElementsByTagName('span')[0].textContent = "nice";
//<input type="checkbox" onclick="changeStateAlarm(' + i + ')" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" value="active" checked></p>