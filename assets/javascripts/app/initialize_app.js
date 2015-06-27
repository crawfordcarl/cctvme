require([
  'app'
], function(App) {

  var startApp = function() {
    window.app = new App();

    geoSuccess = function(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
    };

    function geoError(error) {
      alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

    function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);
    };

    function compassError(error) {
      alert('CompassError: ' + error.code);
    };

    if(navigator.compass) {
      navigator.compass.getCurrentHeading(compassSuccess, compassError);
    }


    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    function doOrientationChange() {
      switch(window.orientation)
      {
        case -90:
        case 90:
          alert('landscape');
          break;
        default:
          alert('portrait');
          break;
      }
    }

    window.addEventListener('orientationchange', function() {
      //defer execution so it doesnt get orientation before it actually rotates
      setTimeout(doOrientationChange, 0);
    });


    app.start();
  };

  // When running through Cordova, we should listen to the 'deviceready'
  // event before starting up, in desktop browsers we don't care...
  if (!!window.cordova) {
    document.addEventListener("deviceready", startApp, false);
  } else {
    startApp();
  }

});
