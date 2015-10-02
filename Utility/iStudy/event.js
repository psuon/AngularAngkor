/////////// Loading Icon ///////////////////////////
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        //        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('load').style.visibility = "hidden";
            //            document.getElementById('contents').style.visibility = "visible";
        }, 1000);
    }
}


/////////// Click Event Article ///////////////////////////

var main = function () {
    $('.article').click(function () {
        $('.article').removeClass('current');

        $(this).children('.description').slideToggle(500);
        $(this).addClass('current');
        $('.description').click(false);
        $('i', this).toggleClass("fa-plus fa-remove");
    });

    $('.navigation').hide(); //when the page first load, it hide the nav
    $('.noToggle').click(false); // No toggle on picture, to do list, overview

    $('.menu').click(function () {
        $('.menu').removeClass('current');
        $(this).children('.navigation').toggle("slide");
        $('.myList').click(false);
        $(this).addClass('current');

    });
}

$(document).ready(main);


/////////// Fade In Page ///////////////////////////
$(document).ready(function () {
    $('body').hide().fadeIn(3000);

});


/////////// Date ///////////////////////////
function printToday() {
    var today = new Date();
    document.write(today.toDateString());
}