$(document).ready(function() {
    $('.margin-slider-in-slider-x').sliderGo({    
        flag: {
            circle: false,
            halfNext: false,
            halfPrev: false,
            arrowNavigation: true,
            swipe: false,
            ajax: false,
            pager: false,
            timer: true
        },
        styleSheet: {
            show: function(){
                return {
                    display: 'block',
                    opacity: 1,
                    'z-index': 2,
                    background: 'red'
                }
            },
            hide: {
                'z-index': -1,
                background: 'red' 
            }
        },
        wrapper: {
            item            : '.testblock-x',
            curtain         : '.margin-display',
            stage           : '.margin-wrapper',            
            directionPrev   : '.go-prev',
            directionNext   : '.go-next'
        },
        other: {
            type: 'margin',
            easing: 'linear',
            duration: 500,
            see: 1,
            move: 1
        },
        timer: {
            pause: 2000
        }
    }
    );
    $('.margin-slider-in-slider-y').sliderGo({    
        flag: {
            circle: true,
            halfNext: false,
            halfPrev: false,
            arrowNavigation: true,
            swipe: false,
            ajax: false,
            pager: false,
            timer: true
        },
        styleSheet: {
            show: function(){
                return {
                    display: 'block',
                    opacity: 1,
                    'z-index': 2,
                    background: 'yellow'
                }
            },
            hide: {
                'z-index': -1,
                background: '#fff' 
            }
        },
        wrapper: {
            item            : '.testblock-y',
            curtain         : '.margin-display',
            stage           : '.margin-wrapper',            
            directionPrev   : '.go-prev',
            directionNext   : '.go-next'
        },
        other: {
            direction: 'y',
            type: 'margin',
            easing: 'linear',
            duration: 500,
            see: 1,
            move: 1
        },
        timer: {
            pause: 2000
        }
    }
    );

    $('.slider-absolute-x-in').sliderGo({    
        flag: {
            circle: true,
            halfNext: false,
            halfPrev: false,
            arrowNavigation: true,
            swipe: false,
            ajax: true,
            pager: false,
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
            directionPrev   : '.go-prev-main',
            directionNext   : '.go-next-main'
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
    
});