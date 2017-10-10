$(document).ready(function()  {



    var circle = $('.circle');
    var l = circle.length;

    for(var i = 3; i <= l; i=i+5) {
       $(circle[i]).addClass('left')
    }

    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.navigation-list').toggleClass('display');
    });
    $(window).on('resize', function () {
        equalWidth();
    });

    function equalWidth() {
        var width = $('.about-wrapper').outerWidth();
        $('.about-img').css('height', width);
    }
    equalWidth();

    function changeSize() {
       var countPeople = getHtml('total-people-count');
       var countMany = getHtml('total-sum');

       if(+countMany > 10000 || countPeople > 99) {
           $('.total-plus').addClass('margin-right');
           $('.total-sum').addClass('margin-right');
           $('.currency').addClass('margin-right');
           $('.total').css({
               padding: '18px 10px'
           });
           return;
       }
        $('.total-plus').removeClass('margin-right');
        $('.total-sum').removeClass('margin-right');
        $('.currency').removeClass('margin-right');
        $('.total').css({
            padding: '18px 15px'
        })

    }
    changeSize();

    var coursesCount = [];
    var countPeople = 1;

    function getCurrentlyPeople() {
        countPeople = getHtml('.total-people-count')
    }

    function getHtml(selector) {
        return $('.' + selector).html();
    }
    function setHtml(selector, data) {
        return $('.' + selector).text(data);
    }
    function getElement(selector) {
        return $('.' + selector);
    }
    function clearElement(selector) {
        $('.' + selector ).text('');
    }
    function changePeople(flagAction) {
        countPeople = getHtml('total-people-count');
        if (+countPeople >= 1 && flagAction) {
            countPeople++;
            changeHtmlPeople();
        } else if(+countPeople >= 2 && !flagAction){
            countPeople--;
            changeHtmlPeople();
        }

    }
    function changeHtmlPeople() {
        clearElement('total-people-count');
        setHtml('total-people-count', countPeople);
        totalCost(countPeople);
        changeSize();
    }
    function changeCountPeople() {
        getElement('cart-decrement').on('mousedown', function () {
            changePeople(false);
        });

        getElement('cart-increment').on('mousedown', function () {
            changePeople(true);
        });

    }
    changeCountPeople();
    $(".selected-tours").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel:{ preventDefault:true }
    });
    $(".desc-all-text").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel:{ preventDefault:true }
    });

    function findToId(array, element) {
        if(!array.length)
            return false;

        return array.find(function (elem) {

            console.log('data',
                elem.data('tourId'),
                element.data('tourId'),
                +elem.data('tourId') === +element.data('tourId'));

            if(+elem.data('tourId') === +element.data('tourId')) {
                return true;
            }
        });
    }

    function addToCart() {
        $('.tour-button').each(function (elem) {
            $(this).on('click', function () {
                var element =  $(this).parent('.tour')
                    .find('.tour-wrapper-img')
                    .clone()
                    .addClass('circle')
                    .append('<div class="delete-tour">'+
                        '<span class="delete-text">Delete</span>'+
                        '</div>');
                if(!findToId(coursesCount, element)) {
                    addActionDelete(element);
                    coursesCount.push(element);
                    totalCost();
                    element.appendTo($("#mCSB_1_container"));
                }
            })
        })
    }
    addToCart();
    function addActionDelete(element) {
        element.on('click', function () {
            deleteFromCartArray(coursesCount, this);
            totalCost();
            $(this).remove();
        })
    }
    function deleteFromCartArray(array, element) {
        array.splice(array.findIndex(function (e) {
            return +e.data('tourId') === +$(element).data('tourId');
        }), 1);
    }
    function totalCost() {
        var sum = 0;
        coursesCount.forEach(function (elem) {
           sum += +elem.data('tourCost');
        });
        console.log(sum * countPeople);
        clearElement('total-sum');
        setHtml('total-sum', sum * countPeople);
    }
    $('.tour-wrapper-img').on('click', function () {
        $('#myModal').modal();
        $('.modal-body').empty();
        $('.modal-body').append($(this).clone());
        console.log($(this));
    })


    $('.your-class').slick({
        adaptiveHeight: true,
      /*  autoplay: true,*/
        autoplaySpeed: 5000,
        /*centerMode: true,*/
        centerPadding: '100'
    });

});

document.addEventListener('DOMContentLoaded', function () {
    function cutStr(selector) {
        var text = $('.' + selector).html();
        console.log(text.length);
        if(text.length > 270) {
            text = text.substr(0, 200);
            text += '...';
            $('.' + selector).empty().html(text);
        }
    }
    cutStr('review-body');
});