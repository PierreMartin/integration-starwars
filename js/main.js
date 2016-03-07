$(document).ready(function() {

    var windowWidth = $(window).width();

    ///////////////////// MENU MOBILE /////////////////////
    $("#menu_open").click(function() {
        $(".menu_mobile").fadeIn(500);
    });

    $("#menu_close").click(function() {
        $(".menu_mobile").fadeOut(500);
    });

    ///////////////////// ASIDE FIX VIEWPORT /////////////////////
    if (windowWidth <= 769 ) {
        // FORMAT MOBILE OU TV
        console.log('absence d\'animation');
    } else {
        // FORMAT DESTOCK
        var el_img                  = $('#bloc1 aside img');
        var el_bloc1                = $('#bloc1');

        // aside image :
        var img_height          = el_img.outerHeight();
        var img_top_position    = el_img.offset().top;
        var img_bottom_position = (img_top_position + img_height);

        // Bloc1 :
        var bloc_height          = el_bloc1.outerHeight();
        var bloc_top_position    = el_bloc1.offset().top;
        var bloc_bottom_position = (bloc_top_position + bloc_height);

        var decalage_top         = 68;

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll > bloc_top_position - decalage_top) {
                el_img.css({'position': 'fixed', 'top': decalage_top});
            } else {
                el_img.css({'position': 'static', 'top': 'inherit'});
            }

            if (scroll > bloc_bottom_position - img_height) {
                el_img.css({'position': 'absolute', 'top': bloc_bottom_position - img_height + decalage_top});
            }
        });
    }

    ///////////////////// AJAX /////////////////////
    $.getJSON( "json/menu.json", function( data ) {
        $.each( data.menu.menu_items, function( key, val ) {
            $(".xhr_menu").append("<li><a href='" + val.url + "'>" + val.title + "</a></li>");
        });
    });

});



///////////////////// PARALLAX /////////////////////
function parallax(element, vitesse, position) {

    var img             = $(element).attr('src');
    var $window         = $(window);
    var windowWidth     = $(window).width();
    var window_height   = $window.height();
    var $element        = $(element);

    function check_if_in_view() {

        var window_top_position     = $window.scrollTop();
        var window_bottom_position  = (window_top_position + window_height);
        var element_height          = $element.outerHeight();
        var element_top_position    = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {

            $(window).scroll(function(e){

                // elements image :
                if (typeof img !== typeof undefined && img !== false) {
                    $($element).css('margin-top', (window_top_position * vitesse) + 120 + 'px');
                }

                // elements autre qu'image :
                if (typeof img == typeof undefined || img == false) {
                    $($element).css('background-position', 'center' + ' ' + (position + window_top_position * vitesse ) + 'px');
                }

            });
        }

    }

    if (windowWidth <= 769 ) {
        // FORMAT MOBILE
        console.log('absence d\'animation');
    } else {
        // FORMAT DESTOCK
        $window.on('scroll resize', check_if_in_view);
        $window.trigger('scroll');
    }

}
