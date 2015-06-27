define(function(require){
  var Backbone = require('backbone');

  var Photo = Backbone.Model.extend({
    /*
     * cameraId - String the id of the camera the photo came from
     * cameraName - String the name of the camera
     * data - String base64 image data, can be directly passed to image src
     */
  });

  return Photo;
});