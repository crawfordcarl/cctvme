define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Photo = require('models/photo');

  var Photos = Backbone.Collection.extend({
    model: Photo
  });

  return Photos;
});
