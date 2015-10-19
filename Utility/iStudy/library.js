//Simple Image Slider
$(function () {
    var currentIndex = 0,
        items = $('.containerForSlider div'),
        itemAmt = items.length;

    function cycleItems() {
        var item = $('.containerForSlider div').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
    }

    var autoSlide = setInterval(function () {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    }, 3000);

    $('.nextImage').click(function () {
        clearInterval(autoSlide);
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.prevImage').click(function () {
        clearInterval(autoSlide);
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });
});

//Side Nav Menu 
$(function () {
    $("#maincontent > div:gt(0)").hide();
    $("#menu a").on("click", function (e) {
        var href = $(this).attr("href");
        $("#maincontent > " + href).fadeIn();
        $("#maincontent > :not(" + href + ")").hide();

        switch (href) {
        case "#pic":
            $("#picSlider").load("PictureSlider/pictureSlider.html");
            break;
        }
    });
});