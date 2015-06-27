define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var RootView = Marionette.LayoutView.extend({
    el: "#app",
    template: 'root.html',

    hammerEvents: {
      "touch button.removeWidget": "removeWidget",
      "touch button.addWidget": "addWidget"
    },

    initialize: function() {
      return this.listenTo(this.collection, 'add remove', this.updateWidgetCount);
    }
  });

  return RootView;
});
