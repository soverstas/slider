$(document).ready(function() 
    {
        $('.margin-slider-x').sliderGo({    
            flag: {
                circle: false,
                halfNext: false,
                halfPrev: false,
                arrowNavigation: true,
                swipe: true,
                ajax: false,
                pager: true,
                timer: true
            },
            styleSheet: {
                show: function(){
                    return {
                        display: 'block',
                        opacity: 1,
                        'z-index': 2,
                        background: '#f0f'
                    }
                },
                hide: {
                    'z-index': -1,
                    background: '#fff' 
                }
            },
            wrapper: {
                item            : '.marginX-block',
                curtain         : '.marginX-display',
                stage           : '.marginX-wrapper',            
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
            pager: {
                enable: function(num) {
                    return '<span style="color: green;">' + (num + 1) + '</span>';
                },
                disable: function(num) {
                    return '<span style="color: red;">' + (num + 1) +  '</span>';
                },
                wrapper: '.marginX-pager',
                fastMove   : true
            },
            ajax: {
                total: 16
            },
            timer: {
                pause: 2000
            }
        }
        );
            
            
        $('.margin-slider-y').sliderGo({    
            flag: {
                circle: true,
                halfNext: false,
                halfPrev: false,
                arrowNavigation: true,
                swipe: true,
                ajax: false,
                pager: true,
                timer: true
            },
            styleSheet: {
                show: function(){
                    return {
                        display: 'block',
                        opacity: 1,
                        'z-index': 2,
                        background: 'green'
                    }
                },
                hide: {
                    'z-index': -1,
                    background: '#fff' 
                }
            },
            wrapper: {
                item            : '.marginY-block',
                curtain         : '.marginY-display',
                stage           : '.marginY-wrapper',            
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
            pager: {
                enable: function(num) {
                    return '<span style="color: green;">' + (num + 1) + '</span>';
                },
                disable: function(num) {
                    return '<span style="color: red;">' + (num + 1) +  '</span>';
                },
                wrapper: '.marginY-pager',
                fastMove   : true
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