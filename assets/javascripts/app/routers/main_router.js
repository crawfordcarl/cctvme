define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index" // This is a default route.
    },

    initialize: function(options) {
      this.app = options.app;
    },

    index: function() {
      this.app.rootView.render();
    }

  });

  return MainRouter;
});
