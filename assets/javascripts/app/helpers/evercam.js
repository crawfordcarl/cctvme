define(function(require, exports, module) {
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
      $.post(url,
        {
            with_data: true
        },
        function(response){
          callback(response.data);
        }
      );
      return url;
    }
  };
  return Evercam;
});