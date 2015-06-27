require([
  'app'
], function(App) {

  var startApp = function() {
    window.app = new App();

    function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);
    };

    function compassError(error) {
      alert('CompassError: ' + error.code);
    };

    if(navigator.compass) {
      navigator.compass.getCurrentHeading(compassSuccess, compassError);
    }

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
