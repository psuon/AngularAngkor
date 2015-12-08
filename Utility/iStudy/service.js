/*jslint browser: true*/
/*global $, jQuery, alert*/

//Html and CSS
var text = {};
$.getJSON('JSON/data.json', function (data) {
    "use strict";
    console.log(data);
    text = data;
    console.log(data);
    $("#questionHtml").html(text.questionHtml);
    $("#html1").html(text.html1);
    $("#htmlElements1").html(text.htmlElements1);
    $("#attribute1").html(text.attribute1);
    $("#css1").html(text.css1);
    $("#css2").html(text.css2);
    $("#css3").html(text.css3);
    $("#css4").html(text.css4);
    $("#classAttribute1").html(text.classAttribute1);
    $("#classAttribute2").html(text.classAttribute2);
    $("#classAttribute3").html(text.classAttribute3);
    $("#classAttribute4").html(text.classAttribute4);
    $("#classAttribute5").html(text.classAttribute5);
    $("#color1").html(text.color1);
    $("#color2").html(text.color2);
    $("#fontFamily1").html(text.fontFamily1);
    $("#fontFamily2").html(text.fontFamily2);
    $("#fontSize1").html(text.fontSize1);
    $("#fontSize2").html(text.fontSize2);
    $("#borderPaddingMargin1").html(text.borderPaddingMargin1);
    $("#borderPaddingMargin2").html(text.borderPaddingMargin2);
    $("#headAndBody1").html(text.headAndBody1);
    $("#headAndBody2").html(text.headAndBody2);
    $("#display1").html(text.display1);
    $("#display2").html(text.display2);
    $("#position1").html(text.position1);
    $("#position2").html(text.position2);
    $("#float1").html(text.float1);
    $("#float2").html(text.float2);
    $("#javaScript1").html(text.javaScript1);
    $("#jQuery1").html(text.jQuery1);
    $("#jQuery2").html(text.jQuery2);
    $("#jQuery3").html(text.jQuery3);
    $("#jQuery4").html(text.jQuery4);
    $("#git1").html(text.git1);

    //    document.getElementById("html5").innerHTML = text.html5; //using JavaScript
});

var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function ($scope, $http) {
    $http.get('JSON/data.json')
        .success(function (response) {
            $scope.allDoc = response.theDocument;
        });

    //alert
    $scope.alertPopup = function () {
        alert("Sorry there nothing for me to help.");
    }

    $scope.logInPopup = function () {
        alert("Don't click here again");
    }
});