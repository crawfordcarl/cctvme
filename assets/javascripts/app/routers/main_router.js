define(function(require, exports, module) {

  var Backbone = require('backbone');

  var MainRouter = Backbone.Router.extend({

    routes: {
      "": "index" // This is a default route.
    },

    initialize: function(options) {
      this.app = options.app;
    },

    index: function() {
      this.app.mainView.render();
    }

  });

  return MainRouter;
});
