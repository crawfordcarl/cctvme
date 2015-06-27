define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');
  var PhotoListView = require('views/photo/photo_list_view');
  var Photos = require('collections/photos');
  var MapView = require('views/map/map_view');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index", // This is a default route.
      "cameras": "cameras",
      "myphotos": "myPhotos"
    },

    initialize: function(options) {
      this.app = options.app;
    },

    cameras: function() {
      this.app.showView(new CameraListView({
        collection: this.app.cameras
      }));
    },

    index: function() {

      app.showView(new MapView());
    },

    myPhotos: function(){
      // go through localStorage keys and display images saved
      var photos = [];
      for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          photos.push({
            camera: key,
            imageData: localStorage.getItem(key)
          });
        }
      }

      this.app.showView(new PhotoListView({
        collection: new Photos(photos, {parse: true})
      }));
    }

  });

  return MainRouter;
});
