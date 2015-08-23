$.fn.clickOff = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;

    parent.click(function() {
        clicked = true;
    });

    $(document).click(function(event) {
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};

//CUSTOM JS CODE
(function ($) {
    'use strict';

    var main = {

            init: function () {
                var self = this;

                self.highestEl();
                self.eSlider();
                if(comFunct.isDesktop() && Modernizr.mq('only screen and (min-width: 1025px)')) {
                    self.stickyNav();
                }

                self.scrollToPlugin();

                if($('.tree').length > 0 && comFunct.isDesktop() && Modernizr.mq('only screen and (min-width: 1025px)')) {
                    self.treeAnimation();
                }

                main.sectionAnim();
                main.responsiveMenu();
                main.equalize();
            },

            equalize: function () {

                //$('.extra-slider').find('img').vcenter();

                var a = $('.c-item').highestElement();

                $('.contact-wrapper').find('.info').css('height', $('.contact-wrapper').find('#simple-map-canvas').height());

                //$('.c-item').css('height', a.height());

            },

            responsiveMenu: function () {

                var isLateralNavAnimating = false;

                //open/close lateral navigation
                $('.cd-nav-trigger').on('click', function(event){
                    event.preventDefault();
                    //stop if nav animation is running
                    if( !isLateralNavAnimating ) {
                        if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

                        $('body').toggleClass('navigation-is-open');
                        $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                            //animation is over
                            isLateralNavAnimating = false;
                        });
                    }
                });
            },

            sectionAnim: function () {

                //section
                $('[data-animation="on"]').each(function() {

                    /*START PROCESS WRAPPER*/
                    var scrollMagicController = new ScrollMagic();
                    // Animation will be ignored and replaced by scene value in this example
                    var timeline = new TimelineMax();
                    var colText = $(this).find('.three-col-text');

                    var animation = 'Power3.easeInOut';


                    var tweenL = TweenMax.staggerFromTo(colText.find('article.left'), 0.95,
                        { scale: 1, opacity: 0},
                        { opacity: 1, delay: 0.5, ease:animation  }

                    );
                    var tweenM = TweenMax.staggerFromTo(colText.find('article.middle'), 0.65,
                        { scale: 1, opacity: 0},
                        { opacity: 1, delay: 0.2, ease:animation }

                    );
                    var tweenR = TweenMax.staggerFromTo(colText.find('article.right'), 0.95,
                        { scale: 1, opacity: 0},
                        { opacity: 1, delay: 0.5, ease:animation  }

                    );

                    timeline.add([ tweenL, tweenM, tweenR ]);
                    // Create the Scene and trigger when visible
                    var scene = new ScrollScene({
                        triggerElement: $(this),
                        triggerHook: 'onEnter',
                        offset: 200 /* How many pixels to scroll / animate */
                    })
                        .setTween(timeline)
                        .addTo(scrollMagicController);

                });

                //section
                $('.tree-boxes').find('.box').each(function() {

                    /*START PROCESS WRAPPER*/
                    var scrollMagicController = new ScrollMagic();
                    // Animation will be ignored and replaced by scene value in this example
                    var timeline = new TimelineMax();
                    var colText = $(this);

                    var tween = TweenMax.staggerFromTo(colText, 0.4,
                        { scale: 1, opacity: 0, y: '50px'},
                        { opacity: 1, y: '0px', delay: 0.6 },
                        0.3
                    );

                    timeline.add([ tween]);
                    // Create the Scene and trigger when visible
                    var scene = new ScrollScene({
                        triggerElement: $(this),
                        triggerHook: 'onEnter',
                        offset: 100 /* How many pixels to scroll / animate */
                    })
                        .setTween(timeline)
                        .addTo(scrollMagicController);

                });

            },

            stickyNav: function() {

                $('.home-header, .work-header').waypoint(function(direction) {

                    if (direction === 'down') {
                        TweenMax.to($('.main-nav').find('.menu'), 0.4, { padding: '0px 0px', onComplete: function () {
                            if($('.subnav').length > 0) {
                                TweenMax.to($('.subnav'), 0.6, { top: '100%' });
                            }
                        }});

                    } else if (direction === 'up') {
                        TweenMax.to($('.main-nav').find('.menu'), 0.4, { padding: '10px 0px', onComplete: function () {
                            if($('.subnav').length > 0) {
                                TweenMax.to($('.subnav'), 0.6, { top: '-300%' });
                            }
                        }});
                    }

                }, {
                    offset: -100
                });

                /*$('.scroll-1').waypoint(function(direction) {

                 if (direction === 'down') {
                 $('.main-nav').addClass('fixed');
                 TweenMax.to($('.main-nav'), 0.3, { top: '0px', onComplete: function () {
                 $('.main-nav').addClass('fixed');
                 }});

                 } else if (direction === 'up') {
                 TweenMax.to($('.main-nav'), 0.3, { top: '-80px', onComplete: function () {
                 $('.main-nav').removeClass('fixed');
                 }});
                 }

                 }, {
                 offset: 45
                 });*/

            },

            treeAnimation: function () {

                $('.tree').waypoint(function(direction) {

                    if (direction === 'down') {
                        $('#tree').lazylinepainter(
                            {
                                "svgData": pathObj,
                                "strokeWidth": 2,
                                "strokeColor": "#e09b99",
                                onComplete: function () {
                                    console.log('complete');
                                    TweenMax.to($('#tree'), 0.3, { opacity: 0 });
                                    TweenMax.to($('#tree-original'), 0.3, { opacity: 1 });
                                }
                            }).lazylinepainter('paint');

                    } else if (direction === 'up') {
                    }

                }, {
                    offset: 300
                });
            },

            eSlider: function () {
                var autoTween;

                $(".extra-slider.is-slider").extraSlider({
                    'auto': 3,
                    'type': 'fade',
                    'paginate': false,
                    'navigate': false,
                    'resizablr' : true,
                });

                /*$(".extra-slider.is-slider").extraSlider({
                 'auto': 3,
                 //'draggable': true,
                 'type': 'fade',
                 //'keyboard': true,
                 'paginate': false,
                 'navigate': false
                 //'onInit': moveLoader,
                 //'onPause': movePause,
                 //'onResume': moveResume,
                 //'onMoveStart': moveLoader
                 });*/

                function moveLoader(currentItem, total, slider) {
                    //autoTween = TweenMax.fromTo(slider.find('.loader'), 5, {width: 0}, {width: "100%"});
                }
                function movePause(currentItem, total, slider) {
                    autoTween.pause();
                }
                function moveResume(currentItem, total, slider) {
                    autoTween.resume();
                }

                if(window.location.hash) {
                    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                    var gallery = $('a[data-lightbox="' + hash + '"]:first');
                    console.log(hash);
                    console.log(gallery);

                    if(gallery.length > 0){
                        setTimeout(function(){
                            gallery.trigger('click');
                            console.log("clicked");
                        }, 350);

                    } else {
                        // No hash found
                    }
                }

            },

            highestEl: function () {

                $('section').each(function (index) {
                    var $self = $(this);

                    var $el = $self.find('.one-col-text'),
                        elementHeight = 0,
                        elementIndex = false;

                    $el.each(function (index) {
                        var height = $(this).find('article').outerHeight();

                        if (height > elementHeight) {
                            elementHeight = height;
                            elementIndex = index;
                        }
                    });

                    $el.find('article').css('height', elementHeight);
                });


            },

            tabsPlugin: function () {

                $('.tabs-nav li a').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        tab = $this.attr('href');

                    $('.tabs-nav li a').removeClass('active');
                    $('.tab').removeClass('active');
                    $('.tab-img').removeClass('active');

                    $this.addClass('active');
                    $(tab).addClass('active');
                    $(tab+'-img').addClass('active');

                });

            },

            scrollToPlugin: function() {
                var offset;

                if(comFunct.isDesktop() && Modernizr.mq('only screen and (min-width: 1025px)')) {
                    offset = 45;
                    if($('.subnav').length > 0 ) {
                        offset = 146;
                    }
                } else {
                    offset = 54;
                }

                var animation = 'Power2.easeInOut';
                //activate scroll to
                $(document).on('click', '[data-scroll-to="on"]', function(e){
                    e.preventDefault();
                    var scroolToAnchor = $(this).data('scroll-to-target');
                    console.log($(scroolToAnchor).offset().top);

                    TweenMax.to($('html, body'), 0.4, { scrollTop: $(scroolToAnchor).offset().top - offset, ease: animation});
                });
            },

            fixHeader: function () {
                var elSelector		= '.main-nav',
                    elClassFixed	= 'fixed',
                    elClassHidden	= 'hidden',
                    throttleTimeout	= 100,
                    $element		= $( elSelector );

                if( !$element.length ) return true;

                var $window			= $( window ),
                    wHeight			= 0,
                    wScrollCurrent	= 0,
                    wScrollBefore	= 0,
                    wScrollDiff		= 0,
                    $document		= $( document ),
                    dHeight			= 0,

                    throttle = function( delay, fn )
                    {
                        var last, deferTimer;
                        return function()
                        {
                            var context = this, args = arguments, now = +new Date;
                            if( last && now < last + delay )
                            {
                                clearTimeout( deferTimer );
                                deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
                            }
                            else
                            {
                                last = now;
                                fn.apply( context, args );
                            }
                        };
                    };

                $window.on( 'scroll', throttle( throttleTimeout, function()
                {
                    dHeight			= $document.height();
                    wHeight			= $window.height();
                    wScrollCurrent	= $window.scrollTop();
                    wScrollDiff		= wScrollBefore - wScrollCurrent;

                    if(wScrollCurrent > 0) {
                        $element.addClass( elClassFixed );
                    } else if(wScrollCurrent <= 0) {
                        $element.removeClass( elClassFixed );
                    }

                    /*if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
                     $element.removeClass( elClassHidden );

                     else if( wScrollDiff > 0 && $element.hasClass( elClassHidden ) ) // scrolled up; element slides in
                     $element.removeClass( elClassHidden );

                     else if( wScrollDiff < 0 ) // scrolled down
                     {
                     if( wScrollCurrent + wHeight >= dHeight && $element.hasClass( elClassHidden ) ) // scrolled to the very bottom; element slides in
                     $element.removeClass( elClassHidden );

                     else // scrolled down; element slides out
                     $element.addClass( elClassHidden );
                     }*/

                    wScrollBefore = wScrollCurrent;
                }));
            },

            //GSAP ANIMATION
            start: function (data){
                $('['+data+']').each(function(){
                    //Set to starting point
                    var string = $(this).data('from');
                    var condition = 'none';
                    var setExpression = 'none';
                    var noExpression = 'none';
                    var properties = string.split(', ');
                    var obj = {};
                    properties.forEach(function(property) {
                        var tup = property.split(':');

                        if(tup[0] == 'condition'){
                            condition = tup[1];
                        } else if(tup[0] == 'setExpression'){
                            setExpression = tup[1];
                        } else if(tup[0] == 'noExpression'){
                            noExpression = tup[1];
                        } else{
                            obj[tup[0]] = tup[1];
                        }
                    });

                    if(noExpression != 'none' && $('[' + noExpression + ']').length > 0 ){
                        return false;
                    }
                    if(setExpression != 'none' ){
                        $('body').attr(setExpression, 'on');
                    }

                    var css = obj;
                    if(condition != 'none' && $(this).hasClass(condition)){
                        $(this).css(css);
                    }else if(condition == 'none'){
                        $(this).css(css);

                    }
                });
            },
            //GSAP ANIMATION
            animate: function (data){
                $('['+data+']').each(function(){
                    var string = $(this).data('to');
                    var properties = string.split(', ');
                    var obj = {};

                    var delay = 0;
                    var duration = 1;
                    var animation = 'Power1.easeOut';
                    var condition = 'none';

                    properties.forEach(function(property) {
                        var tup = property.split(':');
                        if(tup[0] == 'delay'){
                            delay = tup[1];
                        }else if(tup[0] == 'animation'){
                            animation = tup[1];
                        }else if(tup[0] == 'duration'){
                            duration = tup[1];
                        }else if(tup[0] == 'condition'){
                            condition = tup[1];
                        }else {
                            obj[tup[0]] = tup[1];
                        }

                    });
                    if(condition != 'none' && $(this).hasClass(condition)){
                        TweenMax.to($(this), duration, {css: obj, delay:delay, ease:animation, force3D:true});
                    } else if(condition == 'none'){
                        TweenMax.to($(this), duration, {css: obj, delay:delay, ease:animation, force3D:true});
                    }
                });
            }
        },
        infowindow = new google.maps.InfoWindow(),
        map,
        mapCenter,
        image,
        self,
    //MY_MAPTYPE_ID = 'Pecina Jaroslav',
        simplegmap = {

            minZoom : 1,
            mapContainerId : 'simple-map-canvas',

            init: function ()
            {
                self = this;
                if ($('#'+this.mapContainerId).length > 0) {
                    self.initialize();
                    setTimeout(self.drop,1000);
                }
                image = new google.maps.MarkerImage($('#'+this.mapContainerId).attr('data-img'),
                    new google.maps.Size(114, 76),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(57, 66));
            },
            initialize: function ()
            {
                mapCenter = $('#'+simplegmap.mapContainerId).attr('rel').split('|');

                var myOptions = {
                    zoom: 14,
                    scrollwheel: false,
                    draggable: true,
                    center: new google.maps.LatLng(mapCenter[0], mapCenter[1]),
                    // disableDefaultUI: true,
                    /*
                     mapTypeControlOptions: {
                     mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                     },
                     mapTypeIds: [google.maps.MapTypeId.ROADMAP,MY_MAPTYPE_ID] */
                };

                map = new google.maps.Map(document.getElementById(this.mapContainerId), myOptions);
                //map.mapTypes.set(MY_MAPTYPE_ID, self.stylize());
                //map.setMapTypeId(MY_MAPTYPE_ID);
            },
            stylize: function()
            {
                var featureOpts =
                    [

                    ];

                var styledMapOptions = {
                    name: 'Pecina Jaroslav'
                };
                var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

                return customMapType;
            },
            drop: function() {
                var coord = $('#'+simplegmap.mapContainerId).attr('rel').split('|');
                var latLng = new google.maps.LatLng(coord[0],coord[1]);
                self.addMarker(latLng);
            },
            addMarker: function(_latLng) {
                new google.maps.Marker({
                    position: _latLng,
                    map: map,
                    draggable: false,
                    icon: image,
                    animation: google.maps.Animation.DROP,
                    title: 'Click to zoom'
                });
            }
        };

    $(window).resize(function () {

        if(comFunct.isDesktop() && Modernizr.mq('only screen and (min-width: 1025px)')) {
            main.stickyNav();
        }

        if($('.tree').length > 0 && comFunct.isDesktop() && Modernizr.mq('only screen and (min-width: 1025px)')) {
            main.treeAnimation();
        }

        main.highestEl();
        main.equalize();
        main.scrollToPlugin();

    });

    main.init();
    simplegmap.init();

}($));



/*
 * Lazy Line Painter - Path Object
 * Generated using 'SVG to Lazy Line Converter'
 *
 * http://lazylinepainter.info
 * Copyright 2013, Cam O'Connell
 *
 */

var pathObj = {
    "tree": {
        "strokepath": [
            {
                "path": "M398.312 1895.931c-2.242-6.088-7.968-7.051-12.505-3.772-4.717 3.081-6.675 10.546-4.128 14.685 5.435-.98 9.12-.029 11.501-.75 2.388-.727 4.206-3.075 5.215-8.845-2.471-.016-10.407 1.9-12.355 3.82 2.044-2.498 8.507-5.252 12.272-5.138z",
                "duration": 20
            },
            {
                "path": "M436.673 632.173c2.242-6.088 7.968-7.051 12.505-3.772 4.717 3.081 6.674 10.546 4.128 14.685-5.435-.98-9.121-.029-11.501-.75-2.388-.727-4.206-3.075-5.216-8.845 2.472-.016 10.408 1.9 12.355 3.82-2.044-2.498-8.507-5.251-12.271-5.138z",
                "duration": 20
            },
            {
                "path": "M281.225 2236.61c3.671-4.563 59.81-13.195 64.374-14.825 46.48-16.604 89.738-18.159 141.807-.804 6.085 2.028 65.678 15.504 64.51 17.851-4.214 8.46-46 5-61 6-10.229.682-13.304 13-25 13-17 0-36.999-11.499-45-11-6.065.377-42.328 7.733-48.23 8.183-7.576.575-47.329 2.389-49.052-3.057 3.507-1.64 7.602-2.573 9.281-6.126-11.197-7.606-39.715-1.609-53-6 .078-1.213.551-2.281 1.31-3.222z",
                "duration": 40
            },
            {
                "path": "M430.593 2205.298c-2.823-.664-4.5-8.213-4.5-8.213l-6.525-1.575-9.901 1.8-1.013 3.376s-2.685 3.847-5.393 5.242-10.958 4.554-14.273 1.425c.109 2.511 4.365.87 4.282 3.571-8.373.312-27.667 8.471-29.22 6.41-.01 1.029 1.688 1.281 2.99 1.248-2.783 1.334-8.433.166-12.27.178l-1.228.86c2.364-.4 5.497.904 8.365 1.28 6.792.893 16.908-6.624 21.369-6.408-2.579 1.007-7.907 3.008-7.137 4.994 5.122-5.104 14.435-6.024 22.839-7.851-3.748 4.343-7.791 8.386-12.135 12.133-5.246 1.968-15.836-.905-18.617-.843.844.345 3.107.892 3.631 1.556-7.984-.135-12.923 2.779-19.983 3.569-.807.641.171 1.723-2.142 2.142-.981-.03-1.566.337-2.141.715-1.036.388-3.689-.836-3.569.713h4.283c4.901-1.76 9.441-3.882 14.988-4.997-.812 1.605-5.248 3.271-3.569 4.997 2.81-6.942 14.877-4.631 24.266-4.997-4.571 5.438-9.53 11.467-12.847 17.128-1.431 2.443-2.003 5.465-3.567 7.139-5.309 5.675-17.378 7.663-27.835 9.277-3.722 2.653 9.364-.261 11.42-.712.306 1.576-4.288 1.785-2.142 2.854 4.16-3.936 13.415-6.562 17.843-7.85-5.005 15.121-3.792 22.494-.018 37.385-3.05-24.744-2.131-41.522 12.15-50.946 2.097 4.278-.691 10.98-.714 12.846.347-.841.761-1.616 1.428-2.141-.036 10.265 1.914 18.546 4.995 25.692-.642-5.782-3.015-9.83-2.855-16.414 1.579-.307 1.786 4.289 2.855 2.141-6.319-5.088-.744-17.744-4.282-25.694 2.603-1.453 4.77-7.101 7.137-6.42.604 5.99-2.996 11.095-1.428 17.128.254-7.123 3.407-11.344 2.855-19.271 6.695-6.152 14.72-14.775 21.41-18.554-1.266 7.296.075 17.204-6.423 19.269.982.031 1.567-.336 2.141-.715-3.603 6.631-12.996 11.266-14.272 17.845 2.479-3.714 7.004-9.163 9.99-9.993-.102.844-1.27 1.617 0 2.141 1.064-3.943 4.564-9.218 7.137-9.277-2.249 7.017.547 13.623-.713 19.983-1.194 6.023-9.39 17.738-9.992 19.982.764-1.192 2.707-4.103 3.568-2.854.045.064-3.592 21.743-2.854 22.126-.032-.761.336-1.812.713-.716v9.992c1.642-1.688.256-6.404.714-9.276 1.558-3.44-.292-10.284 2.141-12.849-.939 2.969 3.251 7.191 2.142 5.711-4.508-8.983-.121-20.742 4.281-27.119 1.255 25.865 3.232 35.298 9.13 56.52-3.472-20.699-7.828-42.257-4.847-70.795 1.943 2.937 2.752 11.874 3.568 13.56.41-1.254-.863-4.192.714-4.281 3.299 9.309 9.787 15.429 13.561 24.266.159-1.351-.806-1.575-.715-2.854 3.316 2.639 6.808 8.882 9.991 9.279-6.41-6.438-12.141-13.553-16.414-22.127 1.997 1.121 4.785 5.175 7.138 3.568-2.384-.969-5.786-2.477-7.852-4.996-3.262-3.976-9.622-19.624-9.991-24.978-.623-8.994 3.484-18.638 4.995-27.12 2.252 7.978 10.761 9.698 9.993 20.697 4.396 6.54 3.209 15.469 4.995 23.55v-3.567c.218-4.5-.114-8.45-.715-12.134 1.578-.304 1.786 4.29 2.855 2.143-3.665-3.71-4.92-9.828-5.707-16.416 2.769 3.504 8.55 3.856 11.416 8.564 3.195 5.238 5.114 19.026 3.569 22.125 2.092-.288.571-4.188 2.142-4.995 2.377 8.004 4.763 17.654 4.996 25.692-.031-.759.337-1.812.713-.715.108 4.651 2.031 7.485 2.854 11.42.72-.009.898-1.251 0-1.427-1.353-7.691-3.689-18.192-3.567-24.979 1.275 2.291 2.144 4.99 4.281 6.422-5.91-8.601-8.417-20.606-11.419-32.117 4.886 3.793 11.835 6.274 14.275 12.848.471 1.269-.185 3.1 0 4.283.751 4.846 2.599 9.838 4.282 14.272-.479-7.027-2.797-9.493-2.855-17.843 8.279 5.941 12.416 19.209 10.705 32.829 1.584-4.18 1.348-12.993 1.428-16.415 3.47 6.522 6.562 13.424 9.279 20.699.158.554.019 1.406.713 1.427-.113-.841.121-2.026-.713-2.142-4.546-16.874-11.998-29.972-22.126-41.396-5.323-6.002-10.749-9.837-17.13-14.271-5.878-4.09-12.643-8.505-15.7-14.987 5.755 2.572 12.052 4.6 19.27 5.708 5.314 4.065 12.812 8.009 16.416 12.847.175.235.614 2.668 1.426 1.428-.184-1.766-3.304-4.243-2.142-4.995 6.449 4.512 15.902 8.994 21.562 13.323-.055-.233.083-.416.564-.477 3.357 1.65 7.931 5.85 10.706 5.709-7.121-5.012-14.944-9.321-22.125-14.274 2.153.029 6.113 1.921 7.851 0-12.154-.215-18.36-6.38-25.692-11.418 18.299 4.132 39.33 13.319 50.955 19.351-11.248-14.346-72.185-29.31-75.008-29.974z",
                "duration": 60
            },
            {
                "path": "M457.29 62.58c-6.814-6.395-19.05-3.753-25.032 1.54-3.801 3.36-6.86 6.957-10.192 10.744-2.467 2.802-2.729 3.131-2.873-.185-.172-3.989-.166-7.672-.093-11.682.102-5.604.788-15.154-1.298-21.969l-.283 3.14-.015.163c-.453 4.986-.998 10.742-1.524 15.639v.001l-.11 1.011-.009.073-.097.876-.02.17-.094.83-.015.124-.096.816-.015.12c-.071.6-.142 1.176-.211 1.718l-.024.183-.078.597-.033.247-.065.472-.039.278-.058.396-.04.273-.054.347-.04.256-.052.307-.039.232-.05.269-.038.208-.049.238-.034.168-.053.22-.028.12-.076.265-.142.343-.051.09c-.842 1.399-2.137-3.035-4.396-6.689-1.522-2.46-4.658-6.626-9.32-10.108l-.048-.035c-.281-.209-.567-.415-.859-.618l-.106-.074c-.286-.197-.578-.392-.873-.582l-.136-.088c-.288-.184-.582-.365-.881-.543l-.169-.099c-.289-.17-.584-.335-.883-.497l-.208-.113c-.289-.153-.583-.303-.881-.449l-.247-.121c-.288-.139-.581-.272-.877-.402l-.291-.129c-.287-.122-.578-.238-.872-.354l-.331-.129c-.287-.107-.579-.21-.872-.309l-.369-.125c-.287-.094-.579-.18-.872-.263l-.406-.118-.871-.217-.445-.106c-.287-.063-.582-.117-.875-.172l-.476-.089c-.293-.049-.592-.089-.891-.128l-.497-.068c-.301-.034-.606-.059-.912-.083l-.513-.044c-.315-.018-.638-.027-.958-.035l-.503-.018c-.349-.004-.704.006-1.06.016l-.44.007c-.506.022-1.017.056-1.535.104 22.247 1.112 31.877 33.37 31.518 55.654-.156 9.687-1.324 547.754-1.167 597.985l2.761.209h.785l7.615-47.405c-.12-51.395-1.417-540.085-.649-550.069.455-5.926.72-18.332 8.358-33.385 6.289-7.861 12.949-12.86 24.671-9.85l-.009-.006c.982.258 1.979.551 3.01.907z",
                "duration": 60
            },
            {
                "path": "M396.601 51.882c.299.162.594.327.883.497-.29-.17-.584-.335-.883-.497zM399.649 53.765c.292.203.578.409.859.618-.281-.209-.567-.415-.859-.618zM415.98 59.97c.526-4.896 1.071-10.652 1.524-15.639-.453 4.985-.998 10.742-1.524 15.639zM398.669 53.108c.295.19.587.385.873.582-.286-.197-.577-.391-.873-.582zM415.651 62.931l.094-.83-.094.83zM415.54 63.871l.096-.816-.096.816zM415.315 65.709c.069-.542.14-1.118.211-1.718l-.211 1.718zM392.022 49.876c.293.099.585.201.872.309-.287-.108-.579-.21-.872-.309zM380.4 48.537c.518-.048 1.029-.081 1.535-.104-.506.023-1.018.056-1.535.104zM415.764 61.931l.097-.876-.097.876zM390.78 49.488c.293.083.585.169.872.263-.287-.094-.578-.18-.872-.263zM389.503 49.153c.292.07.584.139.871.217l-.871-.217zM383.937 48.429c.32.008.643.017.958.035-.316-.019-.638-.027-.958-.035zM386.817 48.659c.299.039.598.079.891.128-.294-.049-.593-.089-.891-.128zM382.374 48.427c.355-.01.711-.02 1.06-.016-.349-.004-.704.006-1.06.016zM388.183 48.876c.293.055.588.108.875.172-.288-.063-.582-.117-.875-.172zM395.512 51.319c.298.146.592.296.881.449-.289-.154-.583-.302-.881-.449zM397.652 52.478c.299.178.593.359.881.543-.288-.184-.582-.366-.881-.543zM415.869 60.981l.11-1.011-.11 1.011zM394.388 50.796c.296.13.589.264.877.402-.288-.138-.581-.272-.877-.402zM385.407 48.508c.306.024.611.049.912.083-.3-.034-.606-.059-.912-.083zM393.225 50.313c.294.115.585.231.872.354-.287-.122-.578-.238-.872-.354zM387.707 48.787l.476.089-.476-.089zM396.393 51.769l.208.113-.208-.113zM394.097 50.667l.291.129-.291-.129zM386.319 48.591l.497.068-.497-.068zM391.652 49.751l.369.125-.369-.125zM395.265 51.198l.247.121-.247-.121zM392.894 50.185l.331.129-.331-.129zM390.374 49.37l.406.118-.406-.118zM389.058 49.048l.445.106-.445-.106zM383.434 48.411l.503.018-.503-.018zM381.935 48.434l.44-.007-.44.007zM400.553 54.416l-.045-.033.048.035-.003-.002zM397.484 52.379l.169.099-.169-.099zM398.533 53.021l.136.088-.136-.088zM384.895 48.464l.513.044-.513-.044zM399.542 53.69l.106.074-.106-.074zM415.98 59.971zM417.519 44.168l-.015.163.015-.163zM415.744 62.101l.02-.17-.02.17zM415.636 63.055l.015-.124-.015.124zM415.86 61.055l.009-.073-.009.073zM415.526 63.991l.015-.12-.015.12zM415.29 65.892l.024-.183-.024.183zM414.569 70.398l.053-.22-.053.22zM414.656 70.011l.049-.238-.049.238zM414.323 71.126l.142-.343-.142.343zM414.465 70.783l.076-.265-.076.265zM414.924 68.501l.054-.347-.054.347zM415.018 67.881l.058-.396-.058.396zM414.832 69.063l.052-.307-.052.307zM415.114 67.207l.065-.472-.065.472zM415.212 66.488l.078-.597-.078.597zM414.743 69.564l.05-.269-.05.269z",
                "duration": 60
            },
            {
                "path": "M419.471 80.827c-2.966-2.191-1.221-9.453-.974-12.533.16-2.007 1.197-7.476-.393-8.91l-.025.973v2.084c.002 2.892-.163 5.479-.701 8.318-.475 2.505.003 4.145.155 6.553.398 6.288-1.049 31.393-.226 37.664 1.149-3.246 1.39-25.855 2.156-29.311.635-2.854 2.557-5.391 2.629-8.346-1.533.347-1.709 2.46-2.621 3.508z",
                "duration": 20
            },
            {
                "path": "M429.62 71.526c6.289-7.861 12.949-12.86 24.671-9.85l-.009-.006c-11.964-3.169-20.104.874-24.662 9.856zM444.499 59.813c-12.567 2.095-22.665 14.047-22.878 26.577 1.741-5.537 4.371-10.331 7.999-14.864 4.558-8.982 12.697-13.025 24.662-9.855-2.912-2.005-6.347-2.889-9.783-1.858zM414.273 71.216l.051-.09-.051.09zM414.884 68.757l.04-.256-.04.256zM414.705 69.772l.038-.208-.038.208zM414.793 69.296l.039-.232-.039.232zM414.978 68.154l.04-.273-.04.273zM415.179 66.735l.033-.247-.033.247zM415.075 67.485l.039-.278-.039.278zM414.541 70.519l.028-.12-.028.12zM414.622 70.179l.034-.168-.034.168zM412.828 87.536c-.375 4.137 4.055 557.713 3.377 614.686h.785c1.097-56.314-.876-601.17-.946-604.533-.042-1.93-.393-3.822-.397-5.744-.006-2.701.429-5.234.674-7.909.308-3.358-.771-5.589-1.58-8.71-.335-1.291-.185-1.139-1.087-1.851-1.568-1.239-1.961-1.634-2.588-3.396-.666-1.863-1.834-3.653-2.856-5.339-2.224-3.666-4.801-7.118-7.653-10.321l-.048-.035c-.281-.209-.567-.415-.859-.618l-.106-.074c-.286-.197-.578-.392-.873-.582l-.136-.088c-.288-.184-.582-.365-.881-.543l-.169-.099c-.289-.17-.584-.335-.883-.497l-.208-.113c-.289-.153-.583-.303-.881-.449l-.247-.121c-.288-.139-.581-.272-.877-.402l-.291-.129c-.287-.122-.578-.238-.872-.354l-.331-.129c-.287-.107-.579-.21-.872-.309l-.369-.125c-.287-.094-.579-.18-.872-.263l-.406-.118-.871-.217-.445-.106c-.287-.063-.582-.117-.875-.172l-.476-.089c-.293-.049-.592-.089-.891-.128l-.497-.068c-.301-.034-.606-.059-.912-.083l-.513-.044c-.315-.018-.638-.027-.958-.035l-.503-.018c-.349-.004-.704.006-1.06.016l-.44.007c-.506.022-1.017.056-1.535.104 22.247 1.111 33.508 27.065 32.428 38.998z",
                "duration": 60
            },
            {
                "path": "M389.885 629.235c5.204 2.617 16.585 11.847 19.88 11.086 2.412-.555 3.003-8.349 3.152-13.903.082-3.055.541-91.712.447-192.139l8.02 1.974c.047 98.827.117 183.3.06 186.456.119 6.229 2.805 4.771 8.529.624 11.057-8.01 48.037-24.398 97.889-27.748-46.761 7.471-90.686 20.224-100.299 38.248 5.336-2.219 16.129-3.151 18.538 2.41-3.892-4.078-13.145-2.333-17.239 1.854-8.252 8.435-8.33 44.589-8.609 58.493-.174 8.713 2.332 634.022.801 718.929l-8.756.076c1.311-73.998-1.338-744.295-4.225-758.459-1.58-7.759-5.912-12.918-11.938-18.02-6.039-5.112-8.872-7.589-38.359-13.158-29.486-5.569-63.639-10.626-164.143-15.727-51.341-2.606-100.629-4.902-134.762-5.691-15.942-.368-27.469-.059-34.469.257-8.864.399-14.365 6.573-15.174 6.708.581-.499 4.153-7.107 12.618-8.625 6.199-1.111 17.787-.984 37.968-1.076 90.81-.412 286.546 5.544 330.071 27.431z",
                "duration": 60
            },
            {
                "path": "M417.511 686.037c.191 1.029.902 1.24 1.348 1.906 1.389-1.963-.373-15.002.02-17.205.188-1.05-.128-4.832.176-5.715 1.933-5.622 1.184-7.455-.018-13.022-.912-4.226.574-8.742 1.787-12.89 1.441-4.924 3.545-7.452 7.355-10.542 5.223-4.235 7.576-5.494 13.222-9.121 4.664-2.996 18.427-9.144 34.935-13.816 19.252-5.448 46.265-11.357 99.311-14.236 72.397-3.93 170.848-8.624 234.526-5.834 6.384.279 11.878-.132 18.459 9.246-1.274-1.816-7.602-7.634-18.723-7.634-41.178 0-141.58 2.248-227.521 7.882-51.306 3.363-72.561 6.454-101.207 12.852-29.084 6.495-49.738 21.11-53.617 25.926 5.336-2.219 16.129-3.151 18.538 2.41-3.892-4.078-13.145-2.333-17.239 1.854-8.252 8.435-9.901 36.988-10.18 50.893-.174 8.713.053 665.004 1.152 732.468l-2.055-5.938c-.851-61.253-1.811-725.827-.269-729.484z",
                "duration": 70
            },
            {
                "path": "M419.207 631.49c.274 1.445-.556 1.483-1.077 2.791-.619 1.553-.528 3.251-.547 4.885-.043 3.826-.822 7.544-.695 11.436.127 3.865 2.089 9.926.673 13.497-.226-.461-.876-.894-1.122-1.341-1.587 2.294-.203 17.499-.27 20.147-.09 3.447.416 7.606-.744 10.898-.784-3.237-.678-7.086-.932-10.459-.205-2.725-.918-15.842-.727-18.567.164-2.315-.328-4.737.262-6.946.666-2.496 2.635-7.863-.486-9.477-.531 1.559-.096 3.345-1.268 4.685-2.035-1.523-2.562-4.955-3.897-7.075-1.428-2.265-3.99-2.85-5.425-4.967 2.501.096 6.633 5.559 8.732 4.264.523-.321 1.46-3.055 1.694-3.742 1.276-3.75.754-8.573 1.147-12.541.261-2.635.245-5.769 1.329-8.19.502 1.34.408 2.914.653 4.349.416 2.414 2.269 4.08 2.7 6.353z",
                "duration": 70
            },
            {
                "path": "M828.179 587.082l.807.06-.807-.06zM421.961 625.46c.603 3.065 3.218 2.49 8.848-1.264-1.145 2.264-9.399 7.426-9.921 4.97-5.371-25.356-5.281-94.148-5.838-197.061l2.054.632c.09 98.391.604 171.123 4.857 192.723zM397.448 637.294c10.347 9.962 13.588 6.871 13.588 49.979-.312-5.926-1.854-27.419-4.764-33.285-2.453-4.946-7.017-19.264-32.109-24.9-51.952-11.671-102.824-13.588-172.334-18.675-58.498-4.281-108.9-5.26-142.526-5.854-11.796-.209-26.914-.559-36.577.16-8.611.641-13.131 6.509-13.576 6.469 1.236-.116 5.83-7.348 13.976-7.986 6.05-.475 18.36-.421 36.689-.169 90.072 1.239 308.997 6.69 337.633 34.261z",
                "duration": 60
            },
            {
                "path": "M409.196 2221.925l-.016-.043-.021.049c.019.199.032.197.037-.006z",
                "duration": 20
            },
            {
                "path": "M827.098 1868.968c-4.866-4.171-326.617-3.954-383.298 24.55-5.203 2.617-16.584 11.847-19.88 11.086-2.411-.555-3.003-8.349-3.152-13.903-.196-7.366.406-501.04.406-501.04s1.849-26.157 7.122-34.341c14.755-22.895 96.988-34.604 187.17-38.303 101.035-4.144 155.868-1.981 163.068.517-4.305-4.041-73.514-7.827-184.908-2.605-64.92 3.044-126.652 8.319-161.368 29.512-4.794 2.927-6.86 6.956-10.192 10.743-2.467 2.803-2.729 3.133-2.873-.186-.172-3.989-.166-7.67-.093-11.681.102-5.604.788-15.155-1.298-21.969-.939 10.518-2.717 32.363-3.337 29.755-1.907-8.015-34.556-20.849-74.646-26.699-197.393-28.808-293.766-14.758-309.107-13.315 12.316.616 107.273-4.86 211.11 6.727 49.751 5.552 84.585 10.469 127.902 20.5 42.337 9.805 41.049 27.053 42.192 46.195.793 13.28.187 494.861.323 502.48-.118 6.229-3.544 5.633-9.268 1.485-11.057-8.01-32.647-17.365-50.898-20.146 14.9 5.847 41.142 13.759 54.049 29.785-5.337-2.219-16.129-3.151-18.539 2.41 3.893-4.078 13.146-2.333 17.24 1.854 8.251 8.435 3.523 36.08 3.802 49.984.251 12.566-1.816 224.568-3.337 236.985-1.263 10.306-6.041 18.193-16.693 22.266-6.845 2.618-15.51 1.091-20.987 6.794 7.532-3.104 16.674-1.701 24.276-3.796 6.1-1.681 18.131-8.856 16.185-2.183-.896 3.074-.287 5.998 1.127 9.494-.006.203-.019.205-.036.006 2.234-5.694 4.515-9.82 9.476-10.612 6.952-1.112 12.693 1.703 18.91 3.615 6.295 1.935 16.074-1.409 22.369.992-1.4-2.82-8.97-3.128-11.137-3.343-4.303-.424-7.508-2.629-11.511-4.602-8.548-4.213-10.27-13.695-11.123-22.804-1.669-17.797-4.727-248.223-.533-263.759 2.064-7.645 7.952-13.728 13.977-18.829 6.039-5.112 6.833-6.779 36.32-12.349s63.64-10.626 164.144-15.727c91.478-4.639 183.658-6.108 187.046-5.543z",
                "duration": 60
            },
            {
                "path": "M418.079 1342.76c.002 2.891-.163 5.478-.701 8.318-.475 2.504-.415 4.179-.263 6.586.398 6.288-.631 31.359.192 37.631 1.149-3.246 1.39-25.856 2.156-29.311.635-2.854 2.557-5.392 2.629-8.345-1.534.346-1.71 2.459-2.622 3.506-2.355-1.324-1.221-9.453-.974-12.531.16-2.009 1.197-7.478-.393-8.911l-.025.973v2.084zM414.478 1895.772c-.274 1.445.556 1.483 1.078 2.791.619 1.553.527 3.251.547 4.885.042 3.826.822 7.544.694 11.436-.127 3.865-2.089 9.926-.673 13.497.226-.461.877-.894 1.123-1.341 1.586 2.294.202 17.499.27 20.147.089 3.447-.416 7.605.743 10.898.784-3.237.679-7.086.933-10.459.205-2.725.918-15.842.725-18.567-.163-2.314.328-4.737-.261-6.946-.666-2.496-2.635-7.863.486-9.477.531 1.559.095 3.345 1.267 4.684 2.035-1.523 2.564-4.955 3.898-7.075 1.427-2.265 3.99-2.849 5.424-4.967-2.501.096-6.633 5.558-8.732 4.264-.523-.321-1.46-3.055-1.693-3.742-1.277-3.75-.755-8.573-1.148-12.541-.261-2.635-.245-5.769-1.329-8.189-.501 1.34-.407 2.914-.653 4.349-.414 2.414-2.268 4.08-2.699 6.353zM419.841 2157.37c.535 4.539 1.089 9.513 1.126 14.085.039 4.636-.928 9.278-.387 13.903.401 3.448 1.866 6.382 2.228 9.855.501 4.795 2.69 7.56 4.774 11.813-2.874-2.337-5.128-3.706-6.415-7.348-.714-2.021-.399-4.297-3.341-3.533-.709-2.44.364-5.172.216-7.676-.131-2.191-.431-5.28-1.005-7.347-.767-2.758-1.186-2.788-.482-5.999.538-2.456.45-5.066.821-7.396.512 1.674.392 3.569 1.301 5.028 1.897-4.312-.362-10.822.98-15.573l.184.188z",
                "duration": 60
            },
            {
                "path": "M457.478 2214.457c-6.363-2.284-13.586-.719-20.16-1.791-4.755-.776-12.797-3.421-16.191-7.092-1.896-2.05-1.117-2.644-3.889-3.716-.812-.312-1.381.468-2.267-.184-1.192-.875-1.189-3.5-1.214-4.767-.064-3.029 1.27-6.399.16-9.317-.395.261-1.168.341-1.504.551-2.916-5.469 2.209-13.195 2.65-18.945.403-5.27 3.171-213.991 1.11-218.877-.191 1.029-.901 1.24-1.347 1.906-1.39-1.963.373-15.002-.02-17.205-.189-1.05-.962-1.699-1.266-2.582-1.933-5.622-.095-10.588 1.107-16.155.912-4.226.767-9.049-.446-13.196-1.44-4.924-4.887-7.146-8.697-10.235-5.222-4.235-7.22-6.12-13.222-9.121-7.129-3.565-17.624-9.997-39.426-15.258-51.49-12.422-145.653-24.759-244.947-17.091 11.671-.981 138.004-5.249 239.671 19.418 39.263 9.526 54.661 22.5 58.54 27.315-5.337-2.219-16.129-3.151-18.539 2.41 3.893-4.078 13.146-2.333 17.24 1.854 8.251 8.435 3.523 36.08 3.802 49.984.251 12.566-1.816 224.568-3.337 236.985-1.263 10.306-6.041 18.193-16.693 22.266-6.845 2.618-15.51 1.091-20.987 6.794 7.532-3.104 16.955-1.826 24.558-3.921 6.1-1.681 17.85-8.731 15.904-2.058-.893 3.061-.29 5.975 1.111 9.451 2.229-5.669 4.508-9.773 9.455-10.563 6.952-1.112 12.693 1.703 18.91 3.615 6.295 1.935 16.105-1.034 22.4 1.367-.375-.758-1.488-1.249-2.466-1.842zM96.985 1309.349s113.823.542 205.201 14.662c30.196 4.666 61.631 9.96 82.322 16.856 23.52 7.84 26.758 15.742 28.421 31.361.583 5.479 2.617 501.89-1.013 516.234-.767 3.028-1.137 5.598-6.768 1.844 1.146 2.264 6.658 5.449 7.647 3.142 1.875-4.302 3.347-510.707 3.247-515.44-.042-1.93-.393-3.822-.397-5.743-.006-2.702.429-5.235.674-7.91.308-3.358-.771-5.589-1.58-8.71-.335-1.291-.185-1.139-1.087-1.851-1.568-1.239-1.16-2.189-2.588-3.396-11.309-9.557-48.117-22.074-111.035-29.131-91.069-10.214-203.044-11.918-203.044-11.918zM444.707 1339.061c-13.405 5.461-22.873 15.118-23.086 27.649 1.741-5.537 6.166-15.716 12.78-19.786 19.775-12.169 53.81-19.255 87.15-23.861 40.983-5.662 93.503-9.442 97.245-9.077-.549-.107-67.981.272-128.522 12.223-17.165 3.387-31.156 6.379-45.567 12.852zM436.898 1902.38c-10.347 9.962-14.393 10.796-14.75 46.719.312-5.926 3.738-24.704 5.926-30.025.561-1.363 10.098-19.617 32.109-24.9 52.501-12.601 104.137-13.812 172.334-18.675 94.193-6.719 184.417-6.455 186.777-6.668-13.926-1.311-346.99-.541-382.396 33.549zM414.465 1352.924c3.749-9.167 4.378-18.957 3.054-28.437-.945 10.414-2.299 24.309-3.054 26.615-.073.225-.15.387-.231.503.261.394.493.794.231 1.319z",
                "duration": 60
            },
            {
                "path": "M809.448 585.496c3.168-1.134 4.537-2.146 5.762-4.432.62-1.154 1.096-2.653 2.287-3.377 4.178-2.53 10.424.93 13.426 3.852 3.512 3.417 5.828 8.479 5.927 13.558.235 5.089-2.374 9.807-5.601 11.437-5.621-6.446-11.497-5.198-14.416-7.107-3.517-1.521-.659-5.875-7.07-12.178 2.088-.207 6.548-.074 10.577 1.734 4.082 1.611 7.066 4.208 8.357 5.856-1.48-2.105-4.065-5.373-7.864-7.424-3.191-1.722-7.567-1.656-11.385-1.919zM797.657 580.332c-1.334-.158-2.547-1.094-3.465-3.191-2.616-5.98 16.968-14.655 17.176-14.374 3.362 4.513 4.686 10.911 1.707 16.637-1.452 2.777-4.3 5.481-7.969 6.207-3.736.814-6.988-1.284-7.542-4.126 1.693.478 5.458-.869 7.285-3.649 2.032-2.591 3.028-5.653 3.556-7.014-1.447 3.188-6.668 9.99-10.748 9.51z",
                "duration": 70
            },
            {
                "path": "M820.307 573.344c-2.602-5.025.049-9.281 4.509-10.658 4.459-1.474 9.641.213 12.827 2.912-4.838 8.731-7.912 13.504-16.524 8.555 1.552-1.73 7.641-6.233 9.973-6.93-2.874.506-8.536 3.453-10.785 6.121zM781.087 581.477c-5.428-8.967-.247-7.187 4.346-14.162 3.962 1.047 6.82 6.135 5.422 10.578-1.248 4.383-5.09 6.23-8.983 4.229 1.675-1.295 4.245-7.376 3.841-9.338-.265 2.423-2.881 6.585-4.626 8.693z",
                "duration": 40
            },
            {
                "path": "M798.364 594.823c-2.6 4.009 2.807 8.755-2.443 11.831-6.197 3.632-9.171 2.932-13.061 8.038-2.687-2.849-4.748-6.361-5.234-10.463-.566-4.083.783-8.381 3.2-11.369 4.698-6.283 14.212-6.642 17.227.318-1.768.128-5.234 1.584-7.79 3.996-2.656 2.332-4.279 5.417-4.826 6.86 1.811-3.582 8.523-8.539 12.927-9.211zM803.122 589.268c5.772-2.275 11.542 4.863 10.324 12-.639 7.185-7.16 13.247-12.359 13.216.28-5.57-.96-10.107-1.297-13.628-.373-3.592.275-5.933 2.528-10.771 1.101 1.162 3.06 4.073 3.755 7.543.808 3.432.365 7.054-.023 8.666 1.92-3.749 1.316-13.557-2.928-17.026z",
                "duration": 60
            },
            {
                "path": "M757.249 591.672c3.586-4.342 8.552-3.485 11.324.504 2.979 3.879 2.437 10.555-.838 13.212-4.169-2.365-7.461-2.646-9.203-3.919-1.747-1.281-2.561-3.727-1.73-8.743 2.028.698 7.979 4.547 9.021 6.681-.957-2.635-5.459-6.748-8.574-7.735z",
                "duration": 20
            },
            {
                "path": "M44.486 1306.393c3.763-4.229 2.245-9.006-1.737-11.442-3.957-2.529-9.395-2.175-13.148-.347 2.531 9.655 4.332 15.039 13.899 12.371-1.076-2.062-5.864-7.928-7.952-9.179 2.66 1.2 7.418 5.456 8.938 8.597z",
                "duration": 20
            },
            {
                "path": "M78.489 1304.507c7.475-7.349 2.015-6.902-.713-14.795-4.098.034-8.124 4.259-7.867 8.909.128 4.557 3.395 7.295 7.662 6.317-1.304-1.668-2.293-8.195-1.416-9.997-.343 2.414 1.164 7.093 2.334 9.566z",
                "duration": 20
            },
            {
                "path": "M129.206 1316.467c-2.768-5.868-8.556-6.324-12.787-2.66-4.429 3.483-5.723 11.092-2.823 14.99 5.327-1.454 9.083-.83 11.391-1.757 2.315-.934 3.92-3.433 4.419-9.269-2.463.201-10.201 2.807-11.973 4.891 1.818-2.667 8.013-5.978 11.773-6.195zM437.294 61.664c5.447 8.072 9.512 10.068 13.721 10.289 4.004-.051 10.938-.483 18.279 2.962 1.949-3.716 2.312-8.845.146-13.756-2.114-4.88-6.73-9.103-11.803-11.006-10.486-3.908-20.111 1.172-20.708 9.643 2.364-.711 7.652-1.292 12.712-.3 5.108.933 9.489 3.619 11.216 5.131-2.438-1.53-6.629-3.187-11.142-3.642-4.503-.495-9.147.077-12.421.679zM440.348 50.843c5.583-2.446 7.434-4.271 8.294-6.888.462-1.23.332-2.421.785-3.869.427-1.468 2.518-2.83 4.942-3.455-.493-2.529-2.983-5.568-7.396-5.805-4.336-.186-8.375 2.507-10.434 5.388-4.346 5.854-2.701 13.231 2.61 14.677-.258-1.646.2-5.126 1.679-8.131 1.403-3.073 3.916-5.352 5.27-5.974-3.431 1.976-6.151 9.794-5.75 14.057z",
                "duration": 60
            },
            {
                "path": "M436.546 69.352c.132-1.144.396-2.256.811-3.318-5.191 2.526-8.031 7.38-8.755 9.492-1.453 4.241.384 10.305 3.15 13.633 5.086 6.752 14.367 9.214 21.31 7.892.22-3.713.336-7.254-.111-10.933-.337-2.794-.289-5.267-2.543-7.312-2.162-1.963-5.057-2.81-7.324-4.621-1.659-1.322-3.623-3.704-4.374-7.036-1.124 4.305.263 8.556 1.561 12.386 1.272 4.013 3.471 7.73 4.581 9.384-4.91-4.389-9.111-12.542-8.306-19.567z",
                "duration": 40
            },
            {
                "path": "M463.1 49.636c-4.716-1.312-6.974-6.373-6.636-10.681.248-4.418 2.527-8.349 5.687-11.219 6.226-5.706 16.723-7.93 23.813-4.824-2.01 7.836-3.375 14.994-6.54 19.665-1.503 2.322-3.191 3.891-5.364 4.663-2.159.831-5.002.742-9.058 2.19-.16-1.902.943-6.349 3.426-10.323 2.302-4.042 5.429-7.609 6.923-9.215-4.184 3.147-13.078 12.159-12.251 19.744z",
                "duration": 80
            },
            {
                "path": "M471.388 52.111c3.861-4.902 8.328-5.57 12.684-5.468 4.218.088 7.705 2.772 12.483-.923 1.227 2.617-2.506 14.442-10.514 15.659-8.005 1.218-14.054-2.647-14.891-8.094 1.817.565 5.786 1.213 9.745 1.013 3.978-.115 7.788-1.363 9.379-2.266-4.234 2.072-13.855 1.413-18.886.079zM351.538 33.184c-3.02 3.648-8.354 4.362-12.698 1.698-4.372-2.56-7.057-7.503-7.714-12.235-1.41-9.65 4.107-18.844 10.591-22.646 4.345 5.486 10.409 9.79 11.05 17.104.195 2.226-.21 4.907-.287 7.337-.07 2.211.478 5.814 2.527 7.358-4.363.396-8.914-4.217-10.804-7.878-2.333-4.068-3.239-8.871-3.57-11.059.006 2.759.315 7.203 2.14 11.437 1.591 4.319 5.45 7.919 8.765 8.884z",
                "duration": 60
            },
            {
                "path": "M337.557 41.604c-1.911 1.646-.876 4.332-2.061 6.506-2.349 4.308-7.816 3.202-11.861 3.049-5.376-.207-12.134-.622-17.157 1.473-3.527-10.418 4.092-21.346 9.079-23.789 4.949-2.531 10.126-2.03 13.954.202 3.94 2.181 6.681 6.53 7.319 10.024-1.982-1.003-8.107-1.855-12.648-.711-4.579 1.057-8.07 4.079-9.416 5.57 2.016-1.541 5.523-3.488 9.441-3.988 1.466-.212 6.597-.687 13.35 1.664zM363.422 33.958c-4.368-.458-7.269-3.317-7.963-6.675-.749-3.353.48-6.742 2.585-9.037 4.292-4.729 11.644-5.405 17.365-3.521 1.367 6.833 1.573 12.559.744 15.157-2.827 4.738-5.386 2.358-10.947 3.823-.139-1.255-.116-4.064.914-6.852.947-2.789 2.564-5.389 3.358-6.548-2.668 2.093-7.346 8.953-6.056 13.653zM377.597 63.544c.885-.291 1.639 9.107 1.412 10.3-.66 3.473-3.393 5.415-6.384 6.982-1.933 1.01-8.341 2.943-9.253 7.801-5.972-2.326-10.133-12.743-5.57-21.165 2.024-4.126 5.996-7.127 9.684-7.858 3.719-.839 6.885.564 8.499 2.953-2.104.171-6.562 1.816-9.422 5.226-2.961 3.322-3.967 7.642-4.177 9.56.558-2.364 1.998-6 4.73-8.717 2.684-2.83 9.989-4.92 10.481-5.082z",
                "duration": 60
            },
            {
                "path": "M405.526 88.243c-1.367 6.198-6.705 7.965-11.536 5.949-4.901-1.933-8.155-7.107-8.963-11.72 10.438-4.049 16.51-5.954 20.38 4.49-2.579.38-11.059-.113-13.567-1.187 2.837 1.629 9.831 3.153 13.686 2.468z",
                "duration": 20
            },
            {
                "path": "M356.103 40.342c7.511 5.46 9.014 10.883 4.182 18.104-2.398 3.406-7.055 6.969-12.13 7.472-5.034.584-8.931-1.68-11.094-4.257 2.156-3.322 3.55-6.559 3.401-8.832-.125-2.253-.782-3.559-.179-5.268.98-3.301 5.583-8.501 14.013-7.817-1.439 3.616-3.871 15.619-7.229 18.21 4.263-2.77 7.694-12.578 9.036-17.612zM396.308 51.646c.708-3.049-.846-6.159-1.88-7.952-1.742-3.006-6.725-7.091-11.758-6.397-6.328.586-8.676 5.739-16.038 6.755-1.217 3.865 1.196 8.783 4.692 11.593 3.426 2.896 7.276 4.763 10.003 5.275 2.813.485 4.292.337 5.204-1.156.835-1.504 3.613-3.912 7.873-5.452-6.396-5.482-12.488-5.863-15.686-5.939 2.242.076 2.339-.42 6.016-.229 3.576.191 6.777.684 11.574 3.502zM395.659 40.004c1.036-3.98 3.497-8.408 6.408-11.413 1.039-1.072 3.343-2.198 3.847-3.726 1.13-3.438-3.553-7.5-6.102-9.207-1.747-1.173-6.148-7.854-6.174-11.114-4.73 1.136-8.408 4.424-10.663 9.347-2.31 4.83-2.753 10.215-2.249 14.026 1.231 8.066 5.046 9.562 13.593 10.15-.336-3.693-3.164-16.651-2.776-20.687.394 3.279 1.589 6.473 2.508 9.628.892 3.054 1.786 9.86 1.608 12.996z",
                "duration": 60
            },
            {
                "path": "M402.265 46.95c12.945 1.058 8.914-4.367 15.848-14.742-2.695-4.352-9.959-4.669-14.92.003-4.941 4.441-5.841 10.524-1.996 14.163.992-2.968 7.545-10.195 10.102-10.957-2.884 1.913-7.065 7.943-9.034 11.533z",
                "duration": 20
            },
            {
                "path": "M403.974 69.468c-.855-5.232-5.879-7.603-11.596-6.211-2.81.682-5.796 2.41-7.725 4.933-1.996 2.508-2.443 5.647-1.77 7.723 4.889-1.745 7.961-.181 11.293-.384 3.347-.086 6.904-1.115 9.525-5.056-2.742-.872-12.118-1.667-14.861-.131 3.186-1.932 11.114-2.175 15.134-.874z",
                "duration": 20
            },
            {
                "path": "M47.552 599.721c-3.052 3.622-8.394 4.286-12.714 1.582-4.348-2.599-6.987-7.566-7.601-12.305-1.322-9.663 4.279-18.806 10.799-22.549 4.294 5.525 10.318 9.885 10.892 17.205.175 2.227-.255 4.904-.354 7.334-.091 2.211.424 5.817 2.46 7.382-4.366.354-8.874-4.299-10.731-7.977-2.295-4.091-3.156-8.901-3.469-11.092-.02 2.759.249 7.206 2.035 11.456 1.551 4.335 5.376 7.97 8.683 8.964zM30.425 604.818c-1.491 2.034.121 4.418-.545 6.803-1.32 4.726-6.895 4.878-10.871 5.638-5.285 1.007-11.963 2.123-16.387 5.293-5.781-9.358-.813-21.719 3.496-25.222 4.254-3.578 9.41-4.256 13.643-2.939 4.33 1.237 7.978 4.859 9.387 8.121-2.158-.532-8.318.015-12.484 2.15-4.225 2.06-6.947 5.79-7.924 7.546 1.617-1.954 4.599-4.641 8.303-6.009 1.382-.537 6.275-2.153 13.382-1.381z",
                "duration": 450
            },
            {
                "path": "M59.985 601.346c-4.365-.498-7.238-3.385-7.902-6.747-.719-3.359.542-6.738 2.668-9.013 4.335-4.69 11.691-5.299 17.396-3.363 1.305 6.846 1.458 12.573.605 15.163-2.871 4.713-5.406 2.309-10.981 3.723-.128-1.256-.079-4.065.976-6.843.973-2.78 2.614-5.364 3.418-6.517-2.687 2.069-7.428 8.885-6.18 13.597zM81.614 609.08c4.08 2.343 5.59 6.6 4.23 10.438-1.286 3.885-4.708 6.761-8.74 7.948-4.029 1.224-8.648 1.057-12.574-1.07-3.973-2.023-6.629-6.141-6.315-9.506 3.002-1.176 5.975-2.461 7.66-5.191 1.312-2.125 4.426-5.055 7.062-5.789 2.184-.607 5.422.988 7.258 2.83-1.125 2.676-2.49 4.593-4.771 6.403-2.672 2.342-6.157 3.676-7.828 4.044 4.249.349 13.177-4.123 14.018-10.107z",
                "duration": 450
            },
            {
                "path": "M65.108 631.086c3.751 5.12 1.552 10.294-3.153 12.591-4.688 2.402-10.723 1.429-14.719-1.011 3.854-10.512 6.434-16.329 16.832-12.337-1.418 2.188-7.389 8.227-9.853 9.403 3.096-1.055 8.86-5.301 10.893-8.646z",
                "duration": 20
            },
            {
                "path": "M86.23 602.218c-5.664 1.052-9.363-4.089-8.73-9.499.43-5.455 4.673-10.207 8.851-11.705 2.4 4.392 4.238 8.39 4.813 11.369.502 3.018-.363 5.473-3.944 9.255-1.59-2.122-3.527-10.521-2.91-13.262-.985 3.159-.407 10.511 1.92 13.842zM49.711 605.3c7.46 5.529 8.914 10.965 4.016 18.142-2.431 3.383-7.118 6.904-12.197 7.36-5.039.538-8.915-1.762-11.056-4.358 2.188-3.302 3.611-6.525 3.482-8.8-.104-2.255-.748-3.565-.129-5.269 1.01-3.292 5.659-8.45 14.082-7.689-1.471 3.603-4.014 15.583-7.396 18.143 4.29-2.731 7.81-12.507 9.198-17.529zM712.068 1318.68c-3.383 1.942-4.634 5.471-3.507 8.652 1.066 3.221 3.903 5.604 7.245 6.589 3.34 1.015 7.17.876 10.424-.887 3.293-1.678 5.495-5.091 5.233-7.88-2.487-.975-4.952-2.04-6.35-4.304-1.087-1.761-3.669-4.189-5.854-4.799-1.809-.503-4.494.819-6.016 2.347.933 2.218 2.065 3.807 3.955 5.308 2.215 1.941 5.104 3.047 6.489 3.353-3.522.289-10.921-3.418-11.619-8.379z",
                "duration": 60
            },
            {
                "path": "M749.243 1319.145c-2.998 4.093-1.24 8.229 2.52 10.064 3.748 1.92 8.572 1.142 11.767-.809-3.08-8.402-5.143-13.052-13.455-9.861 1.134 1.75 5.907 6.577 7.876 7.517-2.475-.844-7.084-4.238-8.708-6.911zM705.679 1312.878c4.346.807 7.182-3.136 6.696-7.286-.329-4.185-3.584-7.83-6.788-8.979-1.842 3.368-3.252 6.436-3.692 8.721-.386 2.314.278 4.198 3.025 7.1 1.22-1.628 2.706-8.071 2.232-10.173.755 2.423.311 8.062-1.473 10.617z",
                "duration": 40
            }
        ],
        "dimensions": {
            "width": 838,
            "height": 2311,
            'strokeColor':'#000000',
            responsive: true
        }
    }
};
