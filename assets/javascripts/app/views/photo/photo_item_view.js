define(function(require, exports, module) {

  var Marionette = require('marionette');

  var PhotoItemView = Marionette.ItemView.extend({
    className: 'photo-tile',
    template: 'photo.html',
    onRender: function(){
      console.log(this.serializeData());
    }
  });

  return PhotoItemView;
});