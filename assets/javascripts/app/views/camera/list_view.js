define(function(require, exports, module) {

  var Marionette = require('marionette');
  var CameraItemView = require('views/camera/item_view');

  var CameraItemView = Marionette.CollectionView.extend({
    className: 'camera-tile-list',
    childView: CameraItemView
  });

  return CameraItemView;
});