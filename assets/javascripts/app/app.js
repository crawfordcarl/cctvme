define(function(require, exports, module) {

  // Makes touch events in Backbone easy, see: https://github.com/wookiehangover/backbone.hammer
  require('hammerjs');
  require('jquery-hammerjs');
  require('backbone-hammer');
  require('handlebars_helpers');

  var _            = require('underscore');
  var $            = require('jquery');
  var Backbone     = require('backbone');
  var Marionette   = require('marionette');
  var Router       = require('routers/main_router');
  var Cameras      = require('collections/cameras');
  var MainView     = require('views/root_view');
  var Evercam      = require('helpers/evercam');
  var JST          = require('templates');
  var Photo        = require('models/photo');
  var Photos       = require('collections/photos');

  //
  // setup marionette template cache to obtain from the templates required above
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId, options){
    return JST[templateId];
  };
  //templates are already precomiled, just return them
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate, options) {
    return rawTemplate;
  }

  // We'll use this file to boot up our application. It's extending Backbone.View, but
  // isn't really used as a view at all. You'll want to replace all Backbone code in
  // this project with your own, it only exists to show you how requiring various
  // components in the application work together and it not intended to be an example
  // of a well structured or well built application. A sensible application architecture
  // is up to you, as it's not something Backbone really prescribes.
  var App = Marionette.Application.extend({

    initialize: function() {
      // Create our routers
      this.router = new Router({
        app: this
      });

      this.channel = Backbone.Wreqr.radio.channel('global');
      this.vent = this.channel.vent;
      this.commands = this.channel.commands;
      this.reqres = this.channel.reqres;

      this.commands.setHandler('displayError', function(message){
        alert(message);
      });
    },
    onStart: function(){
      var that = this;

      // Create our views
      this.rootView = new MainView();
      this.rootView.render();

      //create master cameras collection
      this.cameras = new Cameras();

      $.getJSON('config.json', function(config){
        that.config = config;
        that.cameras.fetch();

        that.discoverLocation();

        // Start backbone history
        Backbone.history.start();
      });
    },
    discoverLocation: function() {
      var that = this;

      function geoSuccess(position) {
        that.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        that.vent.trigger('geolocation', that.location);
        that.cameras.fetchNearCameras(that.location);
      }

      function geoError(error) {
        alert('Error in getting the geographic location');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    },
    showView: function(view){
      this.rootView.main.show(view);
    },
    getView: function() {
      return this.rootView.main.currentView;
    },
    getSelfie: function() {
      var that = this;
      var date = new Date();
      function picSuccess(imageData) {
        var photoCollection = new Photos();
        photoCollection.add(new Photo({
          data: "data:image/jpeg;base64," + imageData,
          created:  Math.floor(date.getTime()/1000.0)
        }));
        Evercam.getNearbySnapshots(that.location, 500, function(photos){
          photoCollection.add(photos);
          that.savePhotos(photoCollection, date);
        });
      }

      function picFail(message) {
        alert('Failed because: ' + message);
      }
      if (navigator.camera) {
        navigator.camera.getPicture(picSuccess, picFail, {
          destinationType : Camera.DestinationType.DATA_URL
        });
      } else {
        var photoCollection = new Photos();
        Evercam.getNearbySnapshots(that.location, 500, function(photos){
          photoCollection.add(photos);
          that.savePhotos(photoCollection, date);
        });
      }
    },
    savePhotos: function(photos, date){
      date = date || new Date();
      var timestamp = Math.floor(date.getTime() / 1000) + '';
      localStorage.setItem(timestamp, JSON.stringify(photos.toJSON()));
    }
  });

  return App;
});
