define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');
  var Cameras = require('collections/cameras');
  var MapView = require('views/map/map_view');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index", // This is a default route.
      "cameras": "cameras"
    },

    initialize: function(options) {
      this.app = options.app;
    },

    cameras: function() {
      app.showView(new CameraListView({
        collection: app.cameras
      }));
    },

    index: function() {

      app.showView(new MapView());

      function geoSuccess(position) {
        var data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        app.getView().setLocation(data);
        //app.showView(new MapView(data));

      }

      function geoError(error) {
        alert('Error in getting the geographic location');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }

  });

  return MainRouter;
});
