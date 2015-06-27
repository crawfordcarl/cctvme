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

      // Create our views
      this.rootView = new MainView();
      this.rootView.render();

      //create master cameras collection
      this.cameras = new Cameras();
    },
    onStart: function(){
      var that = this;
      $.getJSON('config.json', function(config){
        that.config = config;
        that.cameras.fetch();

        // Start backbone history
        Backbone.history.start();
      });
    },
    showView: function(view){
      this.rootView.main.show(view);
    },
    saveCameraImage: function(camera){
      var permanentStorage = window.localStorage;
      var tempStorage = window.sessionStorage;

      var imageUrl = Evercam.liveCameraUrl(camera);
      $.get(imageUrl, function(response){
        console.log(response);
      });
    }
  });

  return App;
});
