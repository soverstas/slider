$(document).ready(function() {
    $('.slider-absolute-x').sliderGo({    
        flag: {
            circle: true,
            halfNext: false,
            halfPrev: false,
            arrowNavigation: true,
            swipe: true,
            ajax: true,
            pager: true,
            timer: false,
            rubberBorder: true
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
        wrapper: {
            item            : '.slider-absolute-x-display-item',
            curtain         : '.slider-absolute-x-display-wrapper',
            stage           : '.slider-absolute-x-display',            
            directionPrev   : '.go-prev',
            directionNext   : '.go-next'
        },
        other: {
            direction: 'x',
            easing: 'linear',
            duration: 500,
            see: 2,
            move: 2,
            start: 3
        },
        pager: {
            wrapper: '.slider-absolute-x-pager',
            click: true,
            fastMove   : true,
            initCallback: function(array) {
                var key;
                var temp = '';
                for ( key in array ) {
                    array[key].bind('mouseenter', {
                        key: key
                    }, function(event){
                        temp = array[event.data.key].html();
                        array[event.data.key].html(temp + '<div class="hover">was hovered ' + event.data.key + '</div>');
                    })
                    array[key].bind('mouseleave', {
                        key: key
                    }, function(event){
                        array[event.data.key].html(temp);
                    });
                    array[key].bind('click', {
                        key: key
                    }, function(event){
                        temp = '(X)';
                    });
                }
                return array;
            }
        },
        ajax: {
            total: 16
        },
        timer: {
            pause: 2000
        }
    }
    );   
    
    $('.slider-absolute-y').sliderGo({    
        flag: {
            circle: true,
            halfNext: false,
            halfPrev: false,
            arrowNavigation: true,
            swipe: true,
            ajax: true,
            pager: true,
            timer: false
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
        wrapper: {
            item            : '.slider-absolute-y-display-item',
            curtain         : '.slider-absolute-y-display-wrapper',
            stage           : '.slider-absolute-y-display',            
            directionPrev   : '.go-prev',
            directionNext   : '.go-next'
        },
        other: {
            direction: 'y',
            easing: 'linear',
            duration: 500,
            see: 3,
            move: 3
        },
        pager: {
            wrapper: '.slider-absolute-y-pager',
            click: true,
            fastMove   : true,
            initCallback: function(array) {
                var key;
                var temp = '';
                for ( key in array ) {
                    array[key].bind('mouseenter', {
                        key: key
                    }, function(event){
                        temp = array[event.data.key].html();
                        array[event.data.key].html(temp + '<div class="hover">was hovered ' + event.data.key + '</div>');
                    })
                    array[key].bind('mouseleave', {
                        key: key
                    }, function(event){
                        array[event.data.key].html(temp);
                    });
                    array[key].bind('click', {
                        key: key
                    }, function(event){
                        temp = '(X)';
                    });
                }
                return array;
            }
        },
        ajax: {
            total: 16
        },
        timer: {
            pause: 2000
        }
    }
    );     
})