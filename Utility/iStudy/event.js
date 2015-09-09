/* var main = function() {
  $('.article').click(function() { // 
    $('.article').removeClass('current'); 
    $('.description').hide();

    $(this).addClass('current'); // on this current article, include CSS grey color 
    $(this).children('.description').show(); // show the description - children of that article
  });
} */

//
//function myFunction(element){
//    if( $(element).text()==="Read Less"){
//            $(element)[0].innerText = "Read More";
//    }
//    else{
//       $(element)[0].innerText = "Read Less";
//    }
//}


/////////// Loading Icon ///////////////////////////
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.getElementById('contents').style.visibility="visible";
      },1000);
  }
}



/////////// Click Event Article ///////////////////////////

var main = function() {
        $('.article').click(function() {
        $('.article').removeClass('current');
        
        $(this).children('.description').slideToggle(500);
        $(this).addClass('current');
            
        });
    
        $('.navigation').hide();
        $('.menu').click(function() {
        $('.menu').removeClass('current');
        
        
        $(this).children('.navigation').toggle("slide");
        $(this).addClass('current');
            
        });
}
 
$(document).ready(main);


/////////// Fade In Page ///////////////////////////
$(document).ready(function() {
    $('body').hide().fadeIn(3000);
 
});



/////////// Date ///////////////////////////
function printToday() {
    var today = new Date();
    document.write(today.toDateString());
}






