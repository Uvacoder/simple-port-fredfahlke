// View Mode Toggle

var
    viewModeContainer = $('#view-mode--container')
  , viewModeToggle    = $('#view-mode--toggle')
  ;

var viewMode = {

  // TODO set & eval a cookie to remember this value

  init: function() {
    this.addEventListeners();
  },

  addEventListeners: function() {
    var _this = this;
    viewModeToggle.on('click', function() {
      _this.eval();
    });
  },

  eval: function() {
    var activeMode = document.getElementById('view-mode--toggle').checked;

    if ( activeMode === true ) {
      this.darkMode();
    } else {
      this.lightMode();
    }
  },

  darkMode: function() {
    $body.addClass('view-mode--dark');
  },

  lightMode: function() {
    $body.removeClass('view-mode--dark');
  },
}

viewMode.init();
