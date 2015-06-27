define(function(require, exports, module) {
  var Photo = require('models/photo');

  var Evercam = {
    liveCameraUrl: function(camera){
      var api_id = app.config.evercam_api_id;
      var api_secret = app.config.evercam_api_secret;
      var url = 'https://api.evercam.io/v1/cameras/' + camera.get('id') +
        '/live/snapshot' + '?api_id=' + api_id + '&api_key=' + api_secret;
      return url;
    },
    getSnapshot: function(camera, callback){
      var api_id = app.config.evercam_api_id;
      var api_secret = app.config.evercam_api_secret;
      var url = 'https://api.evercam.io/v1/cameras/' +camera.get('id') +
        '/recordings/snapshots?api_id=' + api_id + '&api_key=' + api_secret;
      return $.post(url,
        {
          with_data: true
        },
        function(response){
          var photo = new Photo(response, {parse: true});
          photo.set('cameraId', camera.get('id'));
          photo.set('cameraName', camera.get('name'));
          callback(photo);
        }
      );
    },
    getNearbySnapshots: function(location, range, callback){
      var that = this;

      var nearCameras = new Cameras();
      var images = [];
      nearCameras.fetchNearCameras(location, range).then(function(){
        nearCameras.each(function(camera){
          that.getSnapshot(camera, function(photo){
            images.push(photo);
            if (images.length == nearCameras.length) {
              callback(images);
            }
          });
        });
      });
    }
  };
  return Evercam;
});