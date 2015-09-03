


$(document).ready(function() {
    $('body').hide().fadeIn(2000);    
});

function printToday() {
    var today = new Date();
    document.write(today.toDateString());
}
