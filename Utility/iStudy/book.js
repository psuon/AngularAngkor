$(function () {
    $("#maincontent > div:gt(0)").hide();
    $("#menu a").on("click", function (e) {
        var href = $(this).attr("href");
        $("#maincontent > " + href).show();
        $("#maincontent > :not(" + href + ")").hide();
    });
});