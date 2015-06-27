define(function(require, exports, module) {
  var Evercam = {
    liveCameraUrl: function(camera){
      var api_id = app.config.evercam_api_id;
      var api_secret = app.config.evercam_api_secret;
      return 'https://evercam.io/v1/cameras/'+camera.get('id')+
        '/live/snapshot?api_id'+api_id+'&api_key='+api_secret;
    }
  };
  return Evercam;
});