define(function(require) {
  var Marionette = require('marionette');
  var _ = require('underscore');


  var PhotoCollageView = Marionette.ItemView.extend({
    template: 'photo_collage.html',
    ui: {
      canvas: '.photo-canvas'
    },
    serializeData: function(){
      return {
        timestamp: this.getOption('timestamp')
      };
    },
    onShow: function(){
      var that = this;
      var $canvas = this.ui.canvas;
      var canvas = $canvas[0];
      var jCollage = new Collage(this.ui.canvas);
      jCollage.setBackgroundColor("#fff");
      var photos = this.collection.toArray().reverse();

      _(photos).each(function(photo, index){
        var image = new Image();
        image.onload = function(){
          var layer = jCollage.addLayer(image);
          layer.setShadow(true);

          //scale image down to fit canvas
          var scale = image.width / canvas.width;
          //jCollage.scaleLayer(layer, Math.floor(image.width * scale), Math.floor(image.width * scale));
          //layer.scale(image.width * scale, image.height * scale);

          // apply random position
          var x = (Math.random() * canvas.width) - image.width / 2;
          var y = (Math.random() * canvas.height) - image.width / 2;

          if (index == photos.length - 1) {
            //ensure the last image is in the center
            x = canvas.width / 2 - image.width / 2;
            y = canvas.height / 2 - image.height / 2;
          }

          layer.offsetX = Math.floor(x);
          layer.offsetY = Math.floor(y);
          // apply random rotation
          var angle = Math.random() * (Math.PI / 8);
          if (Math.random() < 0.5) {
            angle *= -1;
          }
          layer.setAngle(angle);
          jCollage.redraw();
        };
        image.src = photo.get('data');
      });

    }
  });

  return PhotoCollageView;
});