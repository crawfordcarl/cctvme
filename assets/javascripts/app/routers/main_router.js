define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');
  var Cameras = require('collections/cameras');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index" // This is a default route.
    },

    initialize: function(options) {
      this.app = options.app;
    },

    index: function() {
      var cameras = new Cameras();
      app.showView(new CameraListView({
        collection: cameras
      }));
      cameras.fetch();
    }

  });

  return MainRouter;
});
