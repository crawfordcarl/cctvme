define(function(require, exports, module) {

  var Backbone = require('backbone');
  var Camera = require('models/camera');

  var Cameras = Backbone.Collection.extend({
    url: function() {
      var url = 'https://api.evercam.io/v1/public/cameras?api_id=' +
        app.config.evercam_api_id +
        '&api_key=' + app.config.evercam_api_secret;
      if (this.location) {
        url += '&is_near_to=' + this.location.latitude + ',' +
          this.location.longitude;
      }
      if (this.range) {
        url += '&within_distance=' + this.range;
      }
      return url;
    },
    fetchNearCameras: function(location, range){
      this.location = location;
      this.range = range;
      return this.fetch();
    },
    parse: function(response){
      return response.cameras;
    },
    model: Camera
  });

  return Cameras;
});
