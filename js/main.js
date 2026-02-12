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

    /*========Contact Form Setup========*/
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            message = $('#contact-message').val();
        var required = 0;
        $('.con-validate', this).each(function() {
            if ($(this).val() == '') {
                $(this).addClass('con-error');
                required += 1;
            } else {
                if ($(this).hasClass('con-error')) {
                    $(this).removeClass('con-error');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: {
                    con_name: name,
                    con_email: email,
                    con_message: message
                },
                success: function(data) {
                    $("#contact-form input, #contact-form textarea").val('');
                    showAlertBox('success', "Thank You! Your message has been sent.");
                },
                error: function(jqXHR, e) {
                    showAlertBox('error', "There was a problem with your submission, please try again.");
                }
            });
        }
    });

    $(".con-validate").keyup(function() {
        $(this).removeClass('con-error');
    });

    /********** Adding Alert Box **********/
    $('#contact-submit').before('<div class="alert-container"></div>');

    /********** Function Show Alert Box **********/
    function showAlertBox(response, message) {
        var $alertBox = $('<div class="alert"></div>'),
            $alContainer = $('#contact-form .alert-container');
        if (response == 'success') {
            $alertBox.addClass('alert-success').html(message);
            $alContainer.html($alertBox);
        } else {
            $alertBox.addClass('alert-danger').html(message);
            $alContainer.html($alertBox);
        }
        $alContainer.fadeIn(300).delay(2000).fadeOut(400);
    }

});
