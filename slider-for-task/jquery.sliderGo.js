///*
//+0. возможность листания на тачскрине. 
//+1. иметь возможность разделить ее пейджер от ее скролируемого контента 
//+2. пейджер должен либо автоматически генерироваться либо использовать имеющийся код
//+3. Нужна хорошая поддержка дозагрузки ajax
//+4. Триггеры событий 
//+5. Вертикальная/Горизонтальная
//+6. Изменение высоты (горизонтальная) под высоту отображаемого (ых) элементов
//+7. Для ajax - отображение состояния "загружается"
//+9. Поддержка swipe (left, right, top, bottom)
//+10. Возможность автоскролинга
//+11. Эффекты переключения между элементами: fade, next (без "прокручивания" всей карусели к нужному элементу)
//+12. Отображения N элементов одновременно
//+13. Скролинг на N элементов
//+14. Блокировка кругового скролинга
//+15. Половинчаттый айтем 
//-16. Возможность полной (!) реинициализации минимальной кровью
//+17. Тип сколинга - absolute || margin
//+18. Минимум dom insert
//-19. анимация css если есть поддержка в браузере

sliderStorage = [];

;(function ( $ ){
    $.fn.sliderGo = function ( options ) {
        
        //settings object
        var s = {
            flag: {
                arrowNavigation : true, //bind "click" on arrow
                circle          : true, //cicrcle sliding
                rubberBorder    : true, //animate border width/height
                halfNext        : true, 
                halfPrev        : true, 
                pager           : false,    //enable pager
                ajax            : false,    //enable ajax suppoart
                timer           : false,    //enable timer
                swipe           : true      //enable swipe
            },
            swipe : {
                touch: false,       //enable touch
                correction: 10,     //border correction ( |+corrction | |-correction|   )
                ratio: -1           //move ratio
            },
            styleSheet: {
                show: {             //object style for enable items  || finction(){ return styleObject }
                    display : 'block'
                },
                hide: {             //object style for disable items || finction(){ return styleObject }
                    display : 'none',
                    opacity : 1,
                    top     : 0,
                    left    : 0
                },
                customAnimate: {
                    show: false,
                    hide: false
                }
            },
            wrapper: {              //wrappers for initiation
                curtain         : '.slider-display-wrapper',    //wrapper with {overflow: hidden }
                stage           : '.slider-display',            //wrapper with items
                item            : '.slider-display-item',       //wrapper for item
                directionPrev   : '.slider-go-prev',            //element with prev arrow
                directionNext   : '.slider-go-next'             //element with next arrow
            },
            other: {                 
                easing          : 'swing',//'linear',
                duration        : '9000',
                direction       : 'x',
                type            : 'absolute', //margin, custom
                see             : 2,          
                move            : 1,
                bind            : 'sliderGo', //bind prefix for event
                start           : 0,
                prefCallback    : false,
                nextCallback    : false
            },
            pager: {
                tag        : 'li',
                wrapper    : '.slider-pager',
                item       : '.slider-pager-item',
                enable     : '(X)',     //string or function(num) { return HTML }
                disable    : '(><)',    //string of function(num) { return HTML }
                click      : true,      //bind click on ager items
                fastMove   : true,      //if absolute - redirect to needed items
                init       : false,     //function() {return array of pager item}
                initCallback : false    //function(array of pager item) { return array of pager item }
            },
            ajax: {
                tag         : 'div',
                path        : 'loader.php',
                total       : false,
                init        : false, //function() {return total}
                loader      : false,
                callback    : false //function()
            },
            timer: {
                call : false,   //function for timer call. dafault next/prev
                pause : 5000
            }
        };
        if( typeof options == 'object' ) {
            $.extend(true,s, options);
            if( typeof options.styleSheet.show != 'indefinite' ) {
                s.styleSheet.show = options.styleSheet.show;
            }
            if( typeof options.styleSheet.hide != 'indefinite' ) {
                s.styleSheet.hide = options.styleSheet.hide;
            }
        } 
        else if( !options ) {}
        else {
            $.error('invalid parameters in jquery.sliderGo');
        }
        
        return this.each(function() {
            //global variables
            var g = {
                count: false,
                $wrapper : $(this),
                display: {
                    $curtain : $(this).find(s.wrapper.curtain),
                    $stage : $(this).find(s.wrapper.stage)
                },
                pager: {
                    $storage : new Array(),
                    $wrapper : false
                },
                current : 0,
                last    : 0,
                $storage : new Array(),
                animateBlock : false,
                timer: {
                    id: false,
                    call: false
                },
                swipe: {
                    start: false,
                    end: false,
                    position: 0,
                    moved: false
                }
            };
    
            function next() {
                if(!g.animateBlock) {
                    if(s.flag.circle || (g.last + 1) != g.count) {
                        pagerDisable(Math.round(g.current / s.other.move));
                        g.animateBlock = true;
                        var num;
                        var p = 0, m = 0;
                        if(s.other.type === 'absolute') {
                            m = position(g.$storage[g.last]) + measure(g.last);
                        }
                        for(var ii = 1; ii <= s.other.move; ii++) {
                            num = getExistNum(g.last + ii);
                            if(!isObj(g.$storage[num])) {
                                insertItem(num);
                            }
                            show(num, getStyle(m + p));
                            p += measure(num);
                        
                        }
                        g.current = getExistNum(g.current + s.other.move);
                        g.last = getExistNum(g.last + s.other.move);
                        pagerEnable(Math.round(g.current / s.other.move));
                        if(s.other.type == 'margin') {
                            //p += -position(g.display.$stage);
                            for(ii = 1; ii < g.current; ii++) {
                                p+= measure(ii);
                            }
                            if(g.last === 0) {
                                p = 0;
                                for(ii = 0; ii < g.count; ii++) {
                                    show(ii, {});
                                }
                                g.current = 0;
                                g.last = getExistNum(g.last + s.other.see - 1);
                            }
                        }
                        animate(g.display.$stage, getStyle(-p), function(){
                            if(s.other.type != 'margin') {
                                normalise();
                            }
                            else {
                                g.animateBlock = false;
                                hideInactive();
                            }
                        });
                    }
                    rubberBorder();
                    if(typeof s.other.nextCallback == 'function') {
                        s.other.nextCallback();
                    }
                    timer();
                }
                return false;
            }
    
            function prev() {
                if(!g.animateBlock) {
                    if(s.flag.circle || (g.current) != 0) {
                        pagerDisable(Math.round(g.current / s.other.move));
                        g.animateBlock = true;
                        var num = g.current, p = 0, m = 0;
                        m = position(g.$storage[g.current]);
                        for(var ii = 1; ii <= s.other.move; ii++) {
                            num = getExistNum(g.current - ii);
                            if(!isObj(g.$storage[num])) {
                                insertItem(num);
                            }
                            p += measure(num);
                            show(num, getStyle(m - p));
                        }
                        g.current = getExistNum(g.current - s.other.move);
                        g.last = getExistNum(g.last - s.other.move);
                        if(s.flag.halfPrev) {
                            m += measure(g.current) / 2;
                        }
                        pagerEnable(Math.round(g.current / s.other.move));
                        if(s.other.type == 'margin') {
                            //p += position(g.display.$stage)
                            p = 0;
                            for(ii = 0; ii < g.current; ii++) {
                                p -= measure(ii);
                                show(ii, {});
                            }
                            if(g.current === g.count - 1) {
                                g.last = g.count - 1;
                                g.current = getExistNum(g.last - s.other.see + 1);
                                p = 0;
                                for(var ii = 0; ii < g.count - s.other.see; ii++) {
                                    p += -measure(ii);
                                }
                            }
                        }
                        animate(g.display.$stage, getStyle(p - m), function(){
                            if(s.other.type != 'margin') {
                                normalise();
                            }
                            else {
                                g.animateBlock = false;
                                hideInactive();
                            }
                        });
                    }
                    rubberBorder();
                    if(typeof s.other.prevCallback == 'function') {
                        s.other.prevCallback();
                    }
                    timer();
                }               
                return false;
            }
    
            function hideInactive() {
                var num = g.current - 1;
                while(num != -1 && num != g.last) {
                    if(isObj(g.$storage[num])) {
                        hide(num);       
                    }
                    num -= 1;
                }
                num = g.last + 1;
                while(num < g.count && num != g.current) {
                    if(g.$storage[num]) {
                        hide(num);      
                    }
                    num += 1; 
                }
            }  
    
            function normalise() {
                var p = 0, m = 0, num = g.current;
                p = position(g.display.$stage);
                g.display.$stage.css(getStyle(0));
                for(var ii = 0; ii < s.other.see; ii++) {
                    if(!isObj(g.$storage[num])) {
                        insertItem(num);
                    }
                    g.$storage[num].css(getStyle(position(g.$storage[num]) + p))
                    num = getExistNum(num + 1);
                }
                hideInactive();
                g.animateBlock = false;
            }
    
            function ajaxCall(num) {
                var item;
                $.ajax({
                    async: false,
                    type: 'post',
                    url: s.ajax.path,
                    data: 'need=' + num,
                    beforeSend: function() {
                        if(typeof s.ajax.loader == 'function') {
                            s.ajax.loader();
                        }
                    },
                    success: function(html){
                        item = $('<' + s.ajax.tag + ' />').addClass(s.wrapper.item.substr(1, s.wrapper.item.length - 1)).appendTo(g.display.$stage);
                        item.html(html);
                    },
                    complete:function() {
                        if(typeof s.ajax.callback == 'function') {
                            s.ajax.callback();
                        }
                    },
                    error: function() {
                        $.error('ajax request down jquery.sliderGo');
                    }
                })
                return item;
            }
            function hide(num, objParam) {
                var objHide;
                if(typeof s.styleSheet.hide === 'object') {
                    objHide = s.styleSheet.hide; 
                }
                else if(typeof objParam === 'object') {
                    objHide = s.styleSheet.hide(); 
                }
                if(typeof objParam === 'object' && s.other.type != 'margin') {
                    $.extend(objParam, objHide)
                }
                else {
                    objParam = objHide;
                }
                if(typeof g.$storage[num] === 'object') {
                    g.$storage[num].css(objParam);
                }
                else {
                    $.error('function hide(' + num + ') error');
                }
            }
            function show(num, objParam) {
                var objShow;
                if(typeof s.styleSheet.show === 'object') {
                    objShow = s.styleSheet.show; 
                }
                else if(typeof objParam === 'object') {
                    objShow = s.styleSheet.show(); 
                }
                //if(s.other.type != 'margin') {
                if(typeof objParam === 'object' && s.other.type != 'margin') {
                    $.extend(objParam, objShow)
                }
                else{
                    objParam = objShow;
                }

                if(typeof g.$storage[num] === 'object') {
                    g.$storage[num].css(objParam);
                }
                else {
                    $.error('function show(' + num + ') error');
                }
            }
            function getExistNum(num) {
                if(num < 0) {
                    num = num + g.count;
                }
                else if(num >= g.count) {
                    num = num - g.count;
                }
                return num;
            }
    
            function insertItem(num) {
                if(s.flag.ajax && !isObj(g.$storage[num])) {
                    g.$storage[num] = ajaxCall(num);
                }
                else {
                //$.error('function insertItem() error call');
                }
            }
    
            function position(obj) {
                if(s.other.type != 'margin') {
                    if(s.other.direction === 'x') {
                        return obj.position().left;
                    }
                    else if(s.other.direction === 'y') {
                        return obj.position().top;
                    }
                    else {
                        $.error('function position invalid parameters|s.other.direction');
                    }
                }
                else if(s.other.type === 'margin') {
                    if(s.other.direction === 'x') {
                        return parseInt(obj.css('margin-left'));
                    }
                    else if(s.other.direction === 'y') {
                        return parseInt(obj.css('margin-top'));
                    }
                    else {
                        $.error('function position invalid parameters|s.other.direction');
                    }
                }
            }
            function measure(num) {
                if(typeof g.$storage[num] === 'object') {
                    if(s.other.direction === 'x') {
                        return g.$storage[num].width();
                    }
                    else if(s.other.direction === 'y') {
                        return g.$storage[num].height();
                    }
                    else {
                        $.error('function measure invalid parameters|s.other.direction');
                    }
                }
            }
            function getStyle(measure) {
                if(s.other.type != 'margin') {
                    if(s.other.direction === 'x') {
                        return {
                            left: measure
                        }
                    }
                    else if(s.other.direction === 'y') {
                        return {
                            top: measure
                        }
                    }
                    else {
                        $.error('function measure invalid parameters|s.other.direction');
                    }
                }
                else if(s.other.type === 'margin') {
                    if(s.other.direction === 'x') {
                        return {
                            'margin-left': measure
                        }
                    }
                    else if(s.other.direction === 'y') {
                        return {
                            'margin-top': measure
                        }
                    }
                    else {
                        $.error('function measure invalid parameters|s.other.direction');
                    }
                }
            }
            function isObj(val) {
                if(typeof val === 'object') {
                    return true;
                }
                return false;
            }
            function getMax(a, b) {
                if(a > b) {
                    return a;
                }
                return b;
            }
            function rubberBorder() {
                if(s.flag.rubberBorder) {
                    var m = 0, num = g.current, obj = {};
                    for(var ii = 0; ii < s.other.see; ii++) {
                        if(isObj(g.$storage[num])) {
                            if(s.other.direction === 'x') {
                                m = getMax(g.$storage[num].height(), m);
                                obj = {
                                    height: m
                                };
                            }
                            else if(s.other.direction === 'y') {
                                m = getMax(g.$storage[num].width(), m);
                                obj = {
                                    width: m
                                };
                            }
                        }
                        else {
                            $.error('function rubberBorder invalid item see');
                        }
                        num = getExistNum(num + 1);
                    }
                    animate(g.display.$curtain, obj, function(){});
                }
            }
            function animate(objTo, objParams, callback) {
                objTo.stop();
                objTo.animate(objParams, s.other.duration, s.other.easing, callback);
            }    
            function timer() {
                if(s.flag.timer) {
                    if(s.timer.call && !g.timer.call) {
                        g.timer.call = s.timer.call;
                    }
                    else if(!g.timer.call){
                        g.timer.call = next;
                    }
                
                    if(!s.flag.cicle && !s.timer.call) {
                        if ((g.last + 1) >= g.count) {
                            g.timer.call = prev;
                        }
                        else if(g.current <= 0) {
                            g.timer.call = next;
                        }
                    }
                    if(g.timer.Id) {
                        clearInterval(g.timer.Id);
                    }
                    g.timer.Id = setInterval(g.timer.call,  s.timer.pause);
                }
            }
    
            function pagerClick(event) {
                console.log('pager click!!!');
                var num = event.data.num * s.other.move, p = 0, m = 0;
                if(!isObj(g.pager.$storage[num])) {
                    insertItem(num);
                }
                if(s.flag.pager && num != g.current && !g.animateBlock) {
                    g.animateBlock = true;
                    timer();
                    pagerDisable(Math.round(g.current / s.other.move));
                    if(s.other.type === 'absolute') {
                        if(s.pager.fastMove) {
                            if(num < g.current) {
                                p = position(g.$storage[g.current]);
                                g.current = num;
                                g.last = getExistNum(num + s.other.see - 1);
                                for(var ii = 0; ii < s.other.see; ii++) {
                                    num = getExistNum(g.last - ii);
                                    if(!isObj(g.$storage[num])) {
                                        insertItem(num);
                                    }
                                    m += measure(num);
                                    show(num, getStyle(p - m));
                                }
                                m = -(m + p);
                            }
                            else {
                                g.current = num;
                                p = position(g.$storage[g.last]);
                                m = measure(g.last);
                                for(var ii = 0; ii < s.other.see; ii++) {
                                    num = getExistNum(g.current + ii);
                                    if(!isObj(g.$storage[num])) {
                                        insertItem(num);
                                    }
                                    show(num, getStyle(p + m));
                                    m += measure(num);
                                }
                                g.last = getExistNum(g.current + s.other.see - 1);
                                m -= measure(num);
                            }
                        }
                        else {
                            var gap = 0;
                            if(num < g.current) {
                                gap = g.current - num;
                                p = position(g.$storage[g.current]);
                                for(var ii = 1; ii <= gap + s.other.see - 1; ii++) {
                                    num = getExistNum(g.current - ii);
                                    if(!isObj(g.$storage[num])) {
                                        insertItem(num);
                                    }
                                    m += measure(num);
                                    show(num, getStyle(p - m));
                                }
                                g.current = getExistNum(g.current - gap);
                                g.last = getExistNum(g.current + s.other.see - 1);
                                m = -(m);
                            }
                            else {
                                gap = num - g.last;
                                p = position(g.$storage[g.last]);
                                m = measure(g.last);
                                num = getExistNum(g.last + 1);
                                for(var ii = 1; ii < gap + s.other.see; ii++) {
                                    num = getExistNum(g.last + ii);
                                    if(!isObj(g.$storage[num])) {
                                        insertItem(num);
                                    }
                                    show(num, getStyle(p + m));
                                    m += measure(num);
                                }
                                m -= measure(num);
                                g.current = getExistNum(num);
                                g.last = getExistNum(g.current + s.other.see - 1);
                            }
                        }
                        animate(g.display.$stage, getStyle(-m), normalise);
                    }
                    else if(s.other.type === 'margin') {
                        if(num < g.current) {
                            for(var ii = (num - s.other.see + 1); ii < g.current; ii++) {
                                if(isObj(g.$storage[ii])) {
                                    show(ii, {});
                                }
                            }
                        }
                        else {
                            for(var ii = g.current + 1; ii < num + s.other.see; ii++) {
                                if(isObj(g.$storage[ii])) {
                                    show(ii, {});
                                }
                            }
                        }
                        g.current = event.data.num;
                        g.last = event.data.num + s.other.see - 1;
                        if(g.current < 0) {
                            g.current = g.count - s.other.see;
                            g.last = g.count - 1;
                        }
                        else if(g.last >= g.count) {
                            g.current = 0;
                            g.last = g.current + s.other.see - 1;
                            p = 0;
                        }
                        m = 0;
                        for(var ii = 0; ii < g.current; ii++) {
                            m -= measure(ii);
                        }
                        animate(g.display.$stage, getStyle(m), function() {
                            g.animateBlock = false;
                            hideInactive();
                        });
                    }
                    pagerEnable(Math.round(g.current / s.other.move));
                }
                else {
                //*****************************************************
                }
                rubberBorder();
            }
            function pagerEnable(num) {
                if(s.flag.pager && isObj(g.pager.$storage[num]) ) {
                    if(typeof s.pager.enable == 'function') {
                        g.pager.$storage[num].html(s.pager.enable(num));
                    }
                    else {
                        g.pager.$storage[num].html(s.pager.enable);
                    }
                }
            }
            function pagerDisable(num) {
                if(s.flag.pager && isObj(g.pager.$storage[num])) {
                    if(typeof s.pager.disable == 'function') {
                        g.pager.$storage[num].html(s.pager.disable(num));
                    }
                    else {
                        g.pager.$storage[num].html(s.pager.disable);
                    }
                }
            }
            function pagerInit() {
                if(typeof s.pager.init == 'function') {
                    g.pager.$storage = s.pager.init();
                    var key;
                    for(key in g.pager.$storage) {
                        g.pager.$storage[key].bind('click',{
                            'num': key
                        },  pagerClick);
                    }
                }
                else {
                    var pagerItem, num = 0;
                    g.pager.$wrapper = g.$wrapper.find(s.pager.wrapper);
                    for(var ii = 1; ii <= Math.round(g.count / s.other.move); ii++) {                            
                        pagerItem = $('<' + s.pager.tag + ' />').addClass(s.pager.item.substr(1, s.pager.item.length - 1)).appendTo(g.pager.$wrapper);
                        //pagerItem.html(s.pager.disable)
                        if(s.pager.click) {
                            pagerItem.bind('click',{
                                'num': ii - 1
                            },  pagerClick);
                        }
                        g.pager.$storage.push(pagerItem);
                        pagerDisable(ii - 1);
                    }
                                        
                }
                pagerEnable(g.current);
                if(typeof s.pager.initCallback == 'function') {
                    s.pager.$storage = s.pager.initCallback(g.pager.$storage);
                }
            }
            function swipeMove(event) {
                var correction = s.swipe.correction;
                var ratio = s.swipe.ratio;
                var gap;
                if(s.swipe.touch) {
                    if(s.other.direction === 'x') {
                        g.swipe.end = event.originalEvent.touches[0].pageX;
                    }
                    else if(s.other.direction === 'y') {
                        g.swipe.end = event.originalEvent.touches[0].pageY;
                    }
                }
                else {
                    if(s.other.direction === 'x') {
                        g.swipe.end = event.pageX;
                    }
                    else if(s.other.direction === 'y') {
                        g.swipe.end = event.pageY;
                    }
                }
                gap = g.swipe.start - g.swipe.end;
                if(ratio * (gap) < (event.data.min - correction)
                    && -ratio * (gap) < (event.data.max - correction)) {
                    g.swipe.moved = true;
                    g.display.$stage.css(
                        getStyle(g.swipe.position + ratio * (gap))
                        );
                }
            }
            
            function swipeStart(event) {
                if(!g.animateBlock) {
                    if(g.timer.Id) {
                        clearInterval(g.timer.Id);
                    }
                    var num, min = 0, max = 0;
                    num = getExistNum(g.current - 1);
                    if(!isObj(g.$storage[num])) {
                        insertItem(num);
                    }
                    show(num, getStyle(position(g.$storage[g.current]) - measure(num)));
                    min = measure(num);
                    num = getExistNum(g.last + 1);
                    if(!isObj(g.$storage[num])) {
                        insertItem(num);
                    }
                    show(num, getStyle(position(g.$storage[g.last]) + measure(g.last)));
                    max = measure(num);
                    
                    if(g.current === 0 && s.other.type === 'margin') {
                        min = s.swipe.correction;
                    }
                    else if(g.last === (g.count - 1) && s.other.type === 'margin') {
                        max =  s.swipe.correction;
                    }
                    else if(s.other.type === 'margin') {
                        min = measure(g.current - 1);
                        max = measure(g.last + 1);
                    }
                    g.swipe.position =  position(g.display.$stage);
                    if(s.swipe.touch) {
                        if(s.other.direction === 'x') {
                            g.swipe.start = event.originalEvent.touches[0].pageX
                        }
                        else {
                            g.swipe.start = event.originalEvent.touches[0].pageY;
                        }
                        g.display.$curtain.bind('touchmove', {
                            min: min, 
                            max: max
                        },  swipeMove);
                    }
                    else {
                        if(s.other.direction === 'x') {
                            g.swipe.start = event.pageX;
                        }
                        else {
                            g.swipe.start = event.pageY;
                        }
                        g.display.$curtain.bind('mousemove.' + s.other.bind,{
                            min: min, 
                            max: max
                        },  swipeMove);
                    }
                }
            }            
            
            function swipeUp(event) {
                if(g.swipe.moved) {
                    if(g.swipe.end < g.swipe.start) {
                        next();
                    }
                    else if(g.swipe.end > g.swipe.start){
                        prev();
                    }
                    g.swipe.moved = false;
                    if(s.other.type === 'margin') {
                        g.display.$stage.css(getStyle(g.swipe.position));
                    }
                }
                g.display.$curtain.unbind('touchmove.' + s.other.bind, swipeMove);
                g.display.$curtain.unbind('mousemove.' + s.other.bind, swipeMove);
            }
            
            function initGo() {
                if(s.flag.arrowNavigation) {
                    g.$wrapper.find(s.wrapper.directionPrev).bind('click.' + s.other.bind, prev);
                    g.$wrapper.find(s.wrapper.directionNext).bind('click.' + s.other.bind, next);
                }
                var num = 0;
                g.display.$stage.find(s.wrapper.item).each(function(){
                    num = g.$storage.push($(this));
                    hide(num - 1);
                })
                if(s.flag.ajax) {
                    if(typeof s.ajax.init == 'function'){
                        num = s.ajax.init();
                    }
                    else if(s.ajax.total) {
                        num = s.ajax.total;
                    }
                    else {
                        $.error('function init() invalid parameters|ajax');
                    }
                }
                g.count = num;
                g.current = s.other.start;
                if(g.current >= g.count) {
                    $.error('function init() invalid parameters|s.other.startItem');
                }
                if(!isObj(g.$storage[g.current])) {
                    insertItem(g.current);
                }
                var m = measure(g.current);
        
                if(s.flag.halfPrev) {
                    m = m / 2;
                    show(g.current, getStyle(- m));
                }
                else  {
                    show(g.current, getStyle(0));
                }
                for(var ii = 1; ii < s.other.see; ii++) {
                    num = getExistNum(g.current + ii);
                    if(!isObj(g.$storage[g.current])) {
                        insertItem(num);
                    }
                    show(num, getStyle(m));
                    m += measure(num);
                }
                g.last = getExistNum(g.current + s.other.see - 1);
                if(s.flag.swipe) {
                    g.display.$curtain.bind('mousedown.' + s.other.bind, swipeStart);
                    $('body').bind('mouseup.' + s.other.bind, swipeUp);
                }
                else if(s.swipe.touch) {
                    g.display.$curtain.bind('touchstart.' + s.other.bind, swipeStart);
                    $('body').bind('touchend.' + s.other.bind, swipeUp);
                }
                
                if(s.flag.pager) {
                    pagerInit()
                }
                rubberBorder();
                timer();
            }
            initGo();
            
            $.fn.sliderGo.pagerReInit = function( opt ) {
                s.pager.init = function(){return opt};
                console.log('call init');
                pagerInit();
            };
            
            if(typeof $.fn.sliderGo.store != 'array') {
                $.fn.sliderGo.store = new Array();
            }
            sliderStorage.push(g);
            return this;
        });    
    }
}(jQuery))
