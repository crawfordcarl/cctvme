define(function(require, exports, module) {

  var Marionette = require('marionette');

  var CameraItemView = Marionette.ItemView.extend({
    className: 'col-xs-6 col-md-4',
    template: 'camera.html'
  });

  return CameraItemView;
});