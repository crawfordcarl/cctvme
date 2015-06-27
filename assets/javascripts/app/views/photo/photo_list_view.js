define(function(require, exports, module) {

  var Marionette = require('marionette');
  var PhotoItemView = require('views/photo/photo_item_view');

  var PhotoItemView = Marionette.CollectionView.extend({
    className: 'photo-tile-list',
    childView: PhotoItemView
  });

  return PhotoItemView;
});