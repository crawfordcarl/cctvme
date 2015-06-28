define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var CameraListView = require('views/camera/list_view');
  var PhotoPageView = require('views/photo/photo_page_view');
  var PhotoCollageView = require('views/photo/photo_collage_view');
  var Photos = require('collections/photos');
  var MapView = require('views/map/map_view');

  var MainRouter = Marionette.AppRouter.extend({

    routes: {
      "": "index", // This is a default route.
      "cameras": "cameras",
      "myphotos(/:timestamp)": "myPhotos",
      "photocollage/:timestamp": "photoCollage"
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
      var timestamps = [];
      for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          timestamps.push(key);
        }
      }
      timestamps.sort();
      if (!timestamp) {
        timestamp = timestamps[0];
      }
      if (timestamp) {
        if (localStorage.hasOwnProperty(timestamp)) {
          photos = JSON.parse(localStorage.getItem(timestamp),
            {parse: true});
        } else {
          app.command.execute('displayError', 'No photos found for this time');
          return;
        }
      }

      this.app.showView(new PhotoPageView({
        timestamp: timestamp,
        timestamps: timestamps,
        collection: new Photos(photos, {parse: true})
      }));
    },
    photoCollage: function(timestamp){
      if (timestamp) {
        if (localStorage.hasOwnProperty(timestamp)) {
          var photos = JSON.parse(localStorage.getItem(timestamp),
            {parse: true});

          this.app.showView(new PhotoCollageView({
            timestamp: timestamp,
            collection: new Photos(photos, {parse: true})
          }));
        } else {
          app.command.execute('displayError', 'No photos found for this time');
          return;
        }
      }
    }

  });

  return MainRouter;
});
