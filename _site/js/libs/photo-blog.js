$(document).ready(function() {
  var $body = $('body');

  if ( $body.find('.progressively-loaded') ) {
    $('.progressively-loaded li img').lazyload({
      effect : "fadeIn",
      threshold : 50
    });
  }
});




// if ( $body.hasClass('photo-blog-post') ) {
// }
