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
  var MainView     = require('views/widget_view');

  // We'll use this file to boot up our application. It's extending Backbone.View, but
  // isn't really used as a view at all. You'll want to replace all Backbone code in
  // this project with your own, it only exists to show you how requiring various
  // components in the application work together and it not intended to be an example
  // of a well structured or well built application. A sensible application architecture
  // is up to you, as it's not something Backbone really prescribes.
  var App = Backbone.View.extend({

    initialize: function() {
      // Create our routers
      this.router = new Router({
        app: this
      });

      // Create our collections
      var cameras = this.cameras = new Cameras();

      // Create our views
      this.mainView = new MainView({
        collection: cameras
      });

      // Start backbone history
      Backbone.history.start();
    }

  });

  return App;
});
