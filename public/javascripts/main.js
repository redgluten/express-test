// Scrollup button
// ===============

$(document).ready(function() {

    // Hide button on load
    $('#scrollup').hide();

    // Show button if user has scrolled enough
    $(document).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollup').show(200);
        } else {
            $('#scrollup').hide(200);
        }
    });

    // Scroll to top
    $('#scrollup').on('click', function(event) {
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });
});
