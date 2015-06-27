define(function(require, exports, module) {

  var Marionette = require('marionette');

  var CameraItemView = Marionette.ItemView.extend({
    className: 'camera-tile',
    template: 'camera.html'
  });

  return CameraItemView;
});