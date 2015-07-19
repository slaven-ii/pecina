/**
 * A shorthand for console.log
 */
window.log = function(){
    if( this.console ) {
        if ( arguments.length == 1 ) {
            console.log( arguments[0] );
        } else {
            console.log( Array.prototype.slice.call( arguments ) );
        }
    }
};

/**
 * Detection for various devices and browsers.
 *
 * window.device
 */
(function ($) {

    var $html = $('html'),
        userAgent = window.navigator.userAgent.toLowerCase(),
        check = function (needle) {
            return userAgent.indexOf(needle) !== -1
        };

    window.device = {
        iphone: check('iphone'),
        ipad: check('ipad'),
        ipod: check('ipod'),
        android: check('android'),
        blackberry: check('blackberry') || check('bb10') || check('rim')
    };

    device.ios = device.iphone || device.ipod || device.ipad;
    device.mobile = device.ios || device.android;

    device.ios4 = function () {
        if (device.ios) {
            if (/OS [2-4]_\d(_\d)? like Mac OS X/i.test(userAgent)) {
                $html.addClass('ipad-ios4');
                return true;
            } else if (/CPU like Mac OS X/i.test(userAgent)) {
                $html.addClass('ipad-ios4');
                return true;
            }
        }
        return false;
    }();

    if (device.mobile) {
        $html.addClass('touch-device');
    }

})(jQuery);

/**
 * jQuery plugins
 */
;(function ($, window, $window, isUndefined) {

    $.support.transform = (function() {
        var elStyle = document.createElement('div').style;

        return elStyle.transition !== isUndefined ||
        elStyle.WebkitTransition !== isUndefined ||
        elStyle.MozTransition !== isUndefined ||
        elStyle.MsTransition !== isUndefined ||
        elStyle.OTransition !== isUndefined;

    })();


    /**
     * --------------------------------------------------------------------
     * Positions element in the vertical middle.
     * --------------------------------------------------------------------
     *
     * Usage: $('.element').vcenter();
     */
    $.fn.vcenter = function (options) {

        return this.each(function () {

            var $el = $(this);

            // Use CSS3
            if ($.support.transform) {

                $el.css('transform', 'translate(0, -50%)');

                // In case we are on IE8
            } else {

                var resizer = function () {
                    var $p = $el.parent(),
                        $offsetP = $el.offsetParent(), // Find a parent that has a position
                        middle = $el.height() / -2;

                    // If parent does not have position, then calculate the parent offset.
                    if ($offsetP.get(0) != $p.get(0)) {
                        middle += $p.position().top / 2;
                    }

                    $el.css('margin-top', middle);
                };

                $window.on('resize.vcenter', _.debounce(resizer));
                resizer();

            }

        });

    };


    // Legacy
    $.fn.verticalCenter = function( options ) {

        var $t = $( this );

        if ( $t.length > 1 ) {

            $t.each( function () {
                $( this ).verticalCenter( options );
            });

        } else {

            var defaults = {
                preloadSiblings: true
            }

            options = $.extend( {}, defaults, options );

            var $p = $t.parent();
            var height = $t.outerHeight();
            var parentHeight = $p.height();

            if ( options.preloadSiblings ) {

                var $imageSiblings = $p.find( 'img' );

                if ( $imageSiblings.length && ( $t.data( 'child-images-loaded' ) == isUndefined ) ) {

                    $t.data( 'child-images-loaded', true );

                    $t.css( 'visibility', 'hidden' );

                    $imageSiblings.each( function () {

                        var img = new Image();

                        $( img ).error( function () {

                            $t.hide().css( 'visibility', 'visible' ).fadeIn();
                            $t.verticalCenter();

                        } ).load( function () {

                            $t.hide().css( 'visibility', 'visible' ).fadeIn();
                            $t.verticalCenter();

                        } );

                        img.src = $( this ).attr( 'src' );

                    });

                }

            }

            if ( parentHeight <= height ) {
                return;
            }

            var top = Math.floor( (parentHeight - height) / 2 ),
                position = $t.css( 'position' );

            if ( ( position == 'absolute' ) || ( position == 'relative' ) ) {
                $t.css( 'top', top );
            } else {
                $t.css({
                    top: top,
                    position: 'relative'
                });
            }

        }

        return this;

    };

    /**
     * --------------------------------------------------------------------
     * Preloads images.
     * Usage: $.preloadImage(src).then(function (img) { alert(img.width) });
     * --------------------------------------------------------------------
     */
    $.preloadImage = function (src) {
        var img = new Image(),
            dfd = new $.Deferred();

        $(img).load(function () {
            dfd.resolveWith(this, [img]);
        }).error(dfd.resolve);

        img.src = src;

        return dfd;
    }

    /**
     * --------------------------------------------------------------------
     * Returns highest DOM element in the jQuery array.
     * --------------------------------------------------------------------
     */
    $.fn.highestElement = function () {

        var $el = $(this),
            elementHeight = 0,
            elementIndex = false;

        $el.each(function (index) {
            var height = $(this).outerHeight();

            if (height > elementHeight) {
                elementHeight = height;
                elementIndex = index;
            }
        });

        return elementIndex !== false ? $el.eq(elementIndex) : $('');

    };

    // jquery-mousewheel Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
    (function(){var d=["wheel","mousewheel","DOMMouseScroll"];var f="onwheel" in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];var e,a;if($.event.fixHooks){for(var b=d.length;b;){$.event.fixHooks[d[--b]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var g=f.length;g;){this.addEventListener(f[--g],c,false)}}else{this.onmousewheel=c}},teardown:function(){if(this.removeEventListener){for(var g=f.length;g;){this.removeEventListener(f[--g],c,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(g){return g?this.bind("mousewheel",g):this.trigger("mousewheel")},unmousewheel:function(g){return this.unbind("mousewheel",g)}});function c(g){var h=g||window.event,m=[].slice.call(arguments,1),o=0,j=0,i=0,l=0,k=0,n;g=$.event.fix(h);g.type="mousewheel";if(h.wheelDelta){o=h.wheelDelta}if(h.detail){o=h.detail*-1}if(h.deltaY){i=h.deltaY*-1;o=i}if(h.deltaX){j=h.deltaX;o=j*-1}if(h.wheelDeltaY!==undefined){i=h.wheelDeltaY}if(h.wheelDeltaX!==undefined){j=h.wheelDeltaX*-1}l=Math.abs(o);if(!e||l<e){e=l}k=Math.max(Math.abs(i),Math.abs(j));if(!a||k<a){a=k}n=o>0?"floor":"ceil";o=Math[n](o/e);j=Math[n](j/a);i=Math[n](i/a);m.unshift(g,o,j,i);return($.event.dispatch||$.event.handle).apply(this,m)}})();

    // jquery-touchwipe Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
    (function(){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})();

}(jQuery, window, jQuery(window)));

var comFunct = {

    isDesktop: function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            return false;
        } else {
            return true;
        }
    },
    isMobileDevice: function () {
        return navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || navigator.userAgent.toLowerCase().indexOf('ipad') > -1 || navigator.userAgent.toLowerCase().indexOf('ipod') > -1 || navigator.userAgent.toLowerCase().indexOf('android') > -1 || navigator.userAgent.toLowerCase().indexOf('webos') > -1 || navigator.userAgent.toLowerCase().indexOf('blackberry') > -1
    },
    isMobileDeviceFake: function () {
        if (comFunct.getViewport('width') < 979) {
            return true;
        } else {
            return false;
        }

    },
    getViewport: function (type) {
        var viewPortWidth;
        var viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth, viewPortHeight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth, viewPortHeight = document.documentElement.clientHeight
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth, viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
        }

        // return
        if (type == 'width') {
            return viewPortWidth;
        } else {
            return viewPortHeight;
        }
    },
    log: function () {
        if (!window.console) {
            window.console = {
                log: function () {
                }
            };
        } else {
            for (var i = 0; i < arguments.length; i++)
                console.log(arguments[i]);
        }
    },
    is_touch_device: function () {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    },
    getRelativepath: function () {
        var currentUrl = location.href;
        var currentHost = location.protocol + "//" + location.hostname;
        var cRelativeUrl = currentUrl.replace(currentHost, '');

        return cRelativeUrl;
    }
};

//Mobile Detect
var testMobile;
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};