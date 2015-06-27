define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Camera = require('models/camera');

  var Cameras = Backbone.Collection.extend({
    model: Camera
  });

  return Cameras;
});
