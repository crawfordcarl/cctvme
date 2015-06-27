define(function(require, exports, module) {

  var Marionette = require('marionette');

  var PhotoItemView = Marionette.ItemView.extend({
    className: 'photo-tile',
    template: 'photo.html'
  });

  return PhotoItemView;
});