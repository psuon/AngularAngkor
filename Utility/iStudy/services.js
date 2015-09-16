/*jslint browser: true*/
/*global $, jQuery, alert*/

//Html and CSS
var html = {};
$.getJSON('JSON/htmlAndCss.json', function (data) {
    "use strict";
    console.log(data);
    html = data;
    $("#questionHtml").html(html.questionHtml);
    $("#html1").html(html.html1);
    $("#htmlElements1").html(html.htmlElements1);
    $("#attribute1").html(html.attribute1);
    $("#css1").html(html.css1);
    $("#css2").html(html.css2);
    $("#css3").html(html.css3);
    $("#css4").html(html.css4);
    $("#classAttribute1").html(html.classAttribute1);
    $("#classAttribute2").html(html.classAttribute2);
    $("#classAttribute3").html(html.classAttribute3);
    $("#classAttribute4").html(html.classAttribute4);
    $("#classAttribute5").html(html.classAttribute5);
    $("#color1").html(html.color1);
    $("#color2").html(html.color2);
    $("#fontFamily1").html(html.fontFamily1);
    $("#fontFamily2").html(html.fontFamily2);
    $("#fontSize1").html(html.fontSize1);
    $("#fontSize2").html(html.fontSize2);
    $("#borderPaddingMargin1").html(html.borderPaddingMargin1);
    $("#borderPaddingMargin2").html(html.borderPaddingMargin2);

    //    document.getElementById("html5").innerHTML = text.html5; //using JavaScript
});

//JavaScript
var javascript = {};
$.getJSON('JSON/JavaScript.json', function (data) {
    "use strict";
    javascript = data;
    $("#javascript1").html(javascript.javascript1);
    $("#javascript2").html(javascript.javascript2);
    $("#javascript3").html(javascript.javascript3);
    $("#javascript4").html(javascript.javascript4);
});