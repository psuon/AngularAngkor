//Fade In
//$(document).ready(function () {
//    $('body').hide().fadeIn(3000);
//});

//Date and Time 
function printToday() {
    var today = new Date();
    document.write(today.toDateString());
}

//Military time 24 hours
//function startTime() {
//    var today=new Date();
//    var h=today.getHours();
//    var m=today.getMinutes();
//    var s=today.getSeconds();
//    m = checkTime(m);
//    s = checkTime(s);
//    document.getElementById('time').innerHTML = h+":"+m+":"+s;
//    var t = setTimeout(function(){startTime()},500);
//}
//
//function checkTime(i) {
//    if (i<10) {i = "0" + i}; 
//    return i;
//}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    var ampm = '';
    if (h >= 12) {
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }

    h = h % 12;

    h = h ? h : 12; // the hour '0' should be '12'
    //    var ampm = h >= 12 ? 'PM' : 'AM';


    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    // add a zero in front of numbers<10

    document.getElementById('time').innerHTML = h + ':' + m + ':' + s + ' ' + ampm;
    t = setTimeout(function () {
        startTime()
    }, 500);
}