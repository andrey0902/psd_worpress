$(document).ready(function()  {

   var listSource = $('#list-template').html();
    var listTemplate = Handlebars.compile(listSource);


    Handlebars.registerHelper('list', function(context, options) {
        var ret = "<ul class='navigation-list'>";

        for(var i = 0; i < context.length; i++) {
            ret = ret + "<li class='navigation-item'>" + options.fn(context[i]) + "</li>";
        }
        return ret + "</ul>";
    });

    var contextList = {
        nav : [
            {
                url: '1',
                text: '1111'
            },
            {
                url: '2',
                text: '222'
            },
            {
                url: '3',
                text: '333'
            },
            {
                url: '4',
                text: '444'
            },
        ]
    };
    $('.nav-1').append(listTemplate(contextList));


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

    var coursesCount = [];

    function findToid(array, element) {
        if(!array.length)
            return false;
        
        return array.find(function (elem) {

            console.log('data', elem.data('tourId'),
               element.data('tourId'),
                +elem.data('tourId') === +element.data('tourId'));

            return +elem.data('tourId') === +element.data('tourId');
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

              if(!findToid(coursesCount, element)) {
                  addActionDelete(element);
                  coursesCount.push(element);
                  element.appendTo($(".footer"));
              }
                console.log( 'array data',  coursesCount);
            })
        })
    }
    addToCart();
    function addActionDelete(element) {
        element.on('click', function () {
            console.log('delete', this);
            deleteFromCartArray(coursesCount, this);
            $(this).remove();
        })
    }
    function deleteFromCartArray(array, element) {
        array.splice(array.findIndex(function (e) {
            return +e.data('tourId') === +$(element).data('tourId');
        }))
    }
});