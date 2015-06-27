define(function(require, exports, module) {

  var Marionette = require('marionette');

  var MapView = Marionette.ItemView.extend({
    template: 'map.html',
    onShow: function() {

      var lat = this.getOption('latitude') ? this.getOption('latitude') : 51.525503;
      var lng = this.getOption('longitude') ? this.getOption('longitude') : -0.0822229;
      var accuracy = this.getOption('accuracy');

      L.mapbox.accessToken = app.config.mapbox_api_token;
      this.map = L.mapbox.map('map', app.config.mapbox_map_id)
        .setView([
          lat,
          lng
        ], 15);

      if(accuracy) {
        var accuracyCircle = L.circle(
          L.latLng(
            lat,
            lng
          ),
          this.getOption('accuracy'),
          {
            opacity: 1,
            weight: 1,
            fillOpacity: 0.4
          }).addTo(this.map);
      }


      var myIcon = L.icon({
        iconUrl: 'my-icon.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });
      var that = this;

      function addMarker(camera) {
        var lat = camera.get('location').lat;
        var lng = camera.get('location').lng;
        //L.marker([lat, lng], {icon: myIcon}).addTo(map);
        L.marker([lat, lng]).addTo(that.map);
      }

      if(app.cameras.length > 0) {
        app.cameras.forEach(function(camera) {
          addMarker(camera);
        });
      }

      this.listenTo(app.cameras, 'add', function(camera) {
        console.log('addCamera');
        addMarker(camera);
      });

    },
    setLocation: function(location) {
      var that = this;
      that.map.setView([location.latitude, location.longitude], 16);

      var accuracyCircle = L.circle(
        L.latLng(
          location.latitude,
          location.longitude
        ),
        location.accuracy,
        {
          opacity: 1,
          weight: 1,
          fillOpacity: 0.4
        }).addTo(that.map);
    }
  });

  return MapView;
});