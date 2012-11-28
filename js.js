$(document).ready(function() {
    var itemTotal = 20;
    $('.full').each(function(){
        var max = 600;
        var min = 400;
        var $wrapper = $(this);
        $(this).bind('click', function(event){
            $('.slider .curtain').each(function() {
                if($(this).width() < max) {
                    $(this).animate({
                        width: max + 'px',
                        height: max + 'px'
                    })
                    $('.slider-mini .curtain-mini').each(function() {
                        $(this).animate({
                            width: max + 'px'
                        });
                    })
                    $wrapper.html('DO SMALLER');
                }
                else {
                    $(this).animate({
                        width: min + 'px',
                        height: min + 'px'
                    })
                    $('.slider-mini .curtain-mini').each(function() {
                        $(this).animate({
                            width: min + 'px'
                        });
                    })
                    $wrapper.html('DO BIGGER');
                }
            })
        });
    });
//    var pager = function() {
//        var $itemsArray = mini.getGlobal().$storage;
//        return $itemsArray;
//    }
    
    mini = $('.slider-mini').sliderGo({    
        flag: {
            circle:true,
            halfNext: false,
            halfPrev: false,
            rubberBorder: false,
            arrowNavigation: true,
            swipe: false,
            ajax: true,
            pager: true,
            timer: false
        },
        swipe: {
            touch: false
        },
        wrapper: {
            curtain         : '.curtain-mini',
            stage           : '.stage-mini',
            item            : '.item-mini',
            directionPrev   : '.prev-mini',
            directionNext   : '.next-mini'
        },
        styleSheet: {
            show: {
                display: 'block',
                opacity: 1,
                'z-index': 2
            },
            hide: {
                display: 'none',
                opacity: 0,
                'z-index': -1
            }
        },
        other: {
            direction: 'x',
            easing: 'swing',
            duration: 1000,
            see: 6,
            move: 1,
            start: 0
        },
        ajax: {
            path: 'loaderThumbs.php',
            total: itemTotal,
            callback: function() {
                setTimeout(function(){ $('.slider').sliderGo.pagerReInit(sliderStorage[0].$storage) }, 100 );
            }
        }
    }
    );
    normal = $('.slider').sliderGo({    
        flag: {
            circle:true,
            halfNext: false,
            halfPrev: false,
            rubberBorder: false,
            arrowNavigation: true,
            swipe: true,
            ajax: true,
            pager: true,
            timer: false
        },
        swipe: {
            touch: false
        },
        wrapper: {
            curtain         : '.curtain',
            stage           : '.stage',
            item            : '.item',
            directionPrev   : '.prev',
            directionNext   : '.next'
        },
        styleSheet: {
            show: {
                display: 'block',
                opacity: 1,
                'z-index': 2
            },
            hide: {
                display: 'none',
                opacity: 0,
                'z-index': -1
            }
        },
        other: {
            direction: 'x',
            easing: 'swing',
            duration: 1000,
            see: 1,
            move: 1,
            start: 0,
            prevCallback: function() {
                if(sliderStorage[0].current - 2 < sliderStorage[1].current) {
                    $('.prev-mini').trigger('click');
                }
            },
            nextCallback: function() {
                if(sliderStorage[0].last - 2 <= sliderStorage[1].last) {
                    $('.next-mini').trigger('click');
                }
            }
        },
        pager: {
            enable: function(num) {
                //return '&loz;';
            },
            disable: function(num) {
                //return '&diams;';
            },
            init: function(){return sliderStorage[0].$storage},
            fastMove: false,
            click: true
        },
        ajax: {
            path: 'loaderImage.php',
            total: itemTotal
        },
        timer: {
            pause: 2000
        }
    }
    );
        
});