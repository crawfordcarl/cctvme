define(function(require, exports, module) {

  var Marionette = require('marionette');
  var EverCam = require('helpers/evercam');
  var Photos = require('collections/photos');

  var MapView = Marionette.ItemView.extend({
    template: 'map.html',
    onShow: function() {
      this.listenTo(app.vent, 'geolocation', this.setLocation);
      var lat = this.getOption('latitude') ? this.getOption('latitude') : 51.525503;
      var lng = this.getOption('longitude') ? this.getOption('longitude') : -0.0822229;
      var accuracy = this.getOption('accuracy');

      L.mapbox.accessToken = app.config.mapbox_api_token;
      this.map = L.mapbox.map('map', app.config.mapbox_map_id)
        .setView([lat,lng], 15);

      if(accuracy) {
        var accuracyCircle = L.circle(
          L.latLng(
            lat,
            lng
          ),
          300,
          {
            opacity: 1,
            weight: 1,
            fillOpacity: 0.2
          }).addTo(this.map);
      }

      var myIcon = L.icon({
        iconUrl: 'img/camera-icon.png',
        iconRetinaUrl: 'img/camera-icon.png',
        iconSize: [30, 30]
      });
      var that = this;

      function addMarker(camera) {
        var lat = camera.get('location').lat;
        var lng = camera.get('location').lng;
        var marker = L.marker([lat, lng], {icon: myIcon}).addTo(that.map);

        var popupContent = '<img src="' +
          EverCam.liveCameraUrl(camera) +
          '"/>' +
          '<button id="' + camera.get('id') + '"><i class="fa fa-camera"></i></button>';

        $('#map').on('click', '#' + camera.get('id'), function() {
          EverCam.getSnapshot(camera, function(photo){
            app.savePhotos(new Photos([photo]));
          });
        });

        marker.bindPopup(popupContent, {
          minWidth: 300
        });
      }

      if(app.cameras.length > 0) {
        app.cameras.forEach(function(camera) {
          addMarker(camera);
        });
      }

      this.listenTo(app.cameras, 'add', function(camera) {
        addMarker(camera);
      });

    },
    setLocation: function(location) {
      var that = this;
      that.map.setView([location.latitude, location.longitude], 18);

      var accuracyCircle = L.circle(
        L.latLng(
          location.latitude,
          location.longitude
        ),
        location.accuracy,
        {
          opacity: 1,
          weight: 1,
          fillOpacity: 0.2
        }).addTo(that.map);
    }
  });

  return MapView;
});