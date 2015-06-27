define(function(require, exports, module) {

  // Makes touch events in Backbone easy, see: https://github.com/wookiehangover/backbone.hammer
  require('hammerjs');
  require('jquery-hammerjs');
  require('backbone-hammer');

  var _            = require('underscore');
  var $            = require('jquery');
  var Backbone     = require('backbone');
  var Marionette   = require('marionette');
  var Router       = require('routers/main_router');
  var Cameras      = require('collections/cameras');
  var MainView     = require('views/root_view');
  var Evercam      = require('helpers/evercam');
  var JST          = require('templates');

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

      this.vent = Backbone.Radio.channel('global');

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

        that.trigger('geolocation', that.location);
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
    saveCameraImage: function(camera){
      var permanentStorage = window.localStorage;
      var tempStorage = window.sessionStorage;

      Evercam.getSnapshot(camera, function(imageData){
        permanentStorage.setItem(camera.get('id'), imageData);
      });
    }
  });

  return App;
});
