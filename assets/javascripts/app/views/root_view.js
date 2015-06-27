define(function(require, exports, module) {

  var Marionette = require('marionette');
  var NavButtonsView = require('views/nav_buttons_view');

  var RootView = Marionette.LayoutView.extend({
    el: "#app",
    template: 'root.html',
    regions: {
      main: '#main',
      footerButtons: '#footer-buttons'
    },
    hammerEvents: {
      "touch button.removeWidget": "removeWidget",
      "touch button.addWidget": "addWidget"
    },
    onRender: function(){
      this.footerButtons.show(new NavButtonsView());
    }
  });

  return RootView;
});
