/************* Main Js File ************************
    Mason Kelly - Portfolio
    Based on Kalvin Portfolio Template
    Animations removed per user requirements
****************************************/

/*========Document Ready Function========*/
$(function() {

    "use strict";
    var wind = $(window);

    //Home Section Height
    function homeHeight() {
        var homeSection = $('#home')
        homeSection.css({
            "height": $(window).height() + "px"
        });
    }
    homeHeight();
    wind.resize(homeHeight);

    /*========ScrollIt Setup========*/
    $.scrollIt({
        upKey: 38,
        downKey: 40,
        easing: 'swing',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset: -15
    });

    $(window).scroll(function() {
        var navItem = $('nav .navbar-nav .nav-item').last().find('.nav-link');
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
           if( !navItem.hasClass('active')) {
                $('nav .navbar-nav .nav-item .nav-link').removeClass('active');
                navItem.addClass('last-active');
           }
       }
       if( navItem.hasClass('last-active') ) {
           if( $('nav .navbar-nav .nav-item .nav-link').hasClass('active') ) {
                navItem.removeClass('last-active');
           }
        }
    });

    /*========Navbar Scrolling Background========*/
    wind.on("scroll", function() {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar")
        if (bodyScroll > 300) {
            navbar.addClass("fixed-top");
        } else {
            navbar.removeClass("fixed-top");
        }
    });

    /*========Navbar Close On Click Mobile Responsive========*/
    $(".nav-item .nav-link").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

});
