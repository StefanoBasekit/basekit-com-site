// This function will be executed when the user scrolls the page.
$(window).scroll(function(e) {

    var el = $(".scroller_anchor");

    // SB: Bomb out if we don't have the scroller_anchor element on this page
    if (!el.length) {
        return;
    }

    // Get the position of the location where the scroller starts.
    var scroller_anchor = el.offset().top;
    
    // Check if the user has scrolled and the current position is after the scroller's start location and if its not already fixed at the top 
    if ($(this).scrollTop() >= scroller_anchor && $('.partners-subnav').css('position') != 'fixed') 
    {    // Change the CSS of the scroller to hilight it and fix it at the top of the screen.
        $('.partners-subnav').css({
            'position': 'fixed',
            'top': '0px'
        });
        // Changing the height of the scroller anchor to that of scroller so that there is no change in the overall height of the page.
        $('.scroller_anchor').css('height', '110px');
    } 
    else if ($(this).scrollTop() < scroller_anchor && $('.scroller').css('position') != 'relative') 
    {    // If the user has scrolled back to the location above the scroller anchor place it back into the content.
        
        // Change the height of the scroller anchor to 0 and now we will be adding the scroller back to the content.
        $('.scroller_anchor').css('height', '0px');
        
        // Change the CSS and put it back to its original position.
        $('.partners-subnav').css({
            'position': 'relative'
        });
    }
});