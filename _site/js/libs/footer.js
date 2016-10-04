$(function(e){
  var currentPost = window.location.pathname;
  var arrayIndex;

  function init() {
    // random number within array count
    arrayIndex = Math.floor(Math.random() * postURL.length);

    if ( postURL[arrayIndex] === currentPost ) {
      init();
    } else {
      build();
    }
  }

  function build() {
    // pull relevant values from photo posts
    var link = postURL[arrayIndex];
    var title = postTitle[arrayIndex];
    var img = postImage[arrayIndex];
    var cam = postMeta[arrayIndex];
    var geo = postGeo[arrayIndex];

    // build image path
    var imgCompletePath = "/img/photos/" + img;

    // define destination containers
    var metadataContainer = $('#photo-metadata');
    var linkContainer = $('.photo-metadata--link');
    var imageContainer = $('.footer-bg-photo-posts');
    var cameraContainer = $('.photo-metadata--camera');
    var geoContainer = $('.photo-metadata--geo');

    // deliver content
    imageContainer.css('background-image', 'url(' + imgCompletePath + ')');
    linkContainer.prop('href', link).prop('title', title);
    cameraContainer.text(cam);
    geoContainer.text(geo);

    // display
    imageContainer.addClass('is-visible');
    metadataContainer.addClass('is-visible');
  }

  init();
});

