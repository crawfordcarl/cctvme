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
      "myphotos(/:timestamp)": "myPhotos"
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
      var options = {};
      if (app.location) {
        options = app.location;
      }
      app.showView(new MapView(options));
    },

    myPhotos: function(timestamp){
      // go through localStorage keys and display images saved
      var photos = [];
      if (timestamp) {
        if (localStorage.hasOwnProperty(timestamp)) {
          photos = localStorage.getItem(timestamp);
        } else {
          app.command.execute('displayError', 'No photos found for this time');
        }
      } else {
        for (var key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            photos.push(JSON.parse(localStorage.getItem(key)));
          }
        }
      }

      this.app.showView(new PhotoListView({
        collection: new Photos(photos, {parse: true})
      }));
    }

  });

  return MainRouter;
});
