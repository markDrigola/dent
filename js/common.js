'use strict';

//это тестовый валидатор
_('.formCatalog').init({
    configure: {
        email: '.validEmail',
        text: '.validText'
    },
    classes : {
        success : 'inputFormStyleValid'
    },
    message : {
        errEmpty : '',
        errLengthMin : '',
        errLengthMax : '',
        errLogin : '',
        errPassword : '',
        errEmail : '',
        errTelephone : '',
        errText : '',
        errSpase : ''
    }
});

_('.callForm').init({
    configure: {
        text: '.validText'
    },
    classes : {
        success : 'inputFormStyleValid'
    },
    message : {
        errEmpty : '',
        errLengthMin : '',
        errLengthMax : '',
        errLogin : '',
        errPassword : '',
        errEmail : '',
        errTelephone : '',
        errText : '',
        errSpase : ''
    }
});

$('.sliderOne').slick({
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

$('.sertificationSlider').slick({
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrow: true,
    infinite: true,
    speed: 500,
    fade: false,
    cssEase: 'linear'
});

$('.sliderThird').slick({
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

$('.sliderThird').find('.slick-dots').children('li').first().addClass("myActive");

$('.sliderThird').on('click', function () {
    $('.sliderThird').find('.slick-dots').children('li').removeClass("myActive");
    $('.sliderThird').find('.slick-dots').children('li.slick-active').addClass("myActive");
});


$('.slideClickLeft').on('click', function (event) {
    var indexElem = $(this).index();
    var indexSlide = $('.slideClick').index();

    $('.slideClickLeft').removeClass('activeSlide2');
    $(this).addClass('activeSlide2');
    $('.sliderOne').find('.slick-dots').children('li').eq(indexElem).trigger( "click" );
});

$('.sliderOne').find('.slick-next').on('click', function (event) {
    resetClassActiveSlider2();
});
$('.sliderOne').find('.slick-prev').on('click', function (event) {
    resetClassActiveSlider2();
});
function resetClassActiveSlider2() {
    setTimeout(function () {
        $('.slideClickLeft').removeClass('activeSlide2');
        //console.log($('.slider2').find('.slick-track').children('.slick-active').children('div').css('background-image'));
        $('.slideClickLeft').eq($('.slider2').find('.slick-track').children('.slick-active').attr('data-slick-index')).addClass('activeSlide2');
    },500);
};