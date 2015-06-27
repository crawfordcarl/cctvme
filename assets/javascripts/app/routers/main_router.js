define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');
  var Cameras = require('collections/cameras');
  var MapView = require('views/map/map_view');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index" // This is a default route.
    },

    initialize: function(options) {
      this.app = options.app;
    },

    cameras: function() {
      var cameras = new Cameras();
      app.showView(new CameraListView({
        collection: cameras
      }));
      cameras.fetch();
    },

    index: function() {

      function geoSuccess(position) {
        app.showView(new MapView({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }));
      }

      function geoError(error) {
        alert('Error in getting the geographic location');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }

  });

  return MainRouter;
});
