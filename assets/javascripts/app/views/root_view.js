define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');

  var RootView = Marionette.LayoutView.extend({
    el: "#app",
    template: 'root.html',
    regions: {
      main: '#main'
    },
    hammerEvents: {
      "touch button.removeWidget": "removeWidget",
      "touch button.addWidget": "addWidget"
    }
  });

  return RootView;
});
