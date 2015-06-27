define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Camera = require('models/camera');

  var Cameras = Backbone.Collection.extend({
    url: function() {
      return 'https://api.evercam.io/v1/public/cameras?api_id=' +
        app.config.evercam_api_id +
        '&api_key=' + app.config.evercam_api_secret;
    },
    parse: function(response){
      return response.cameras;
    },
    model: Camera
  });

  return Cameras;
});
