define(function(require, exports, module) {

  var Marionette = require('marionette');

  var MapView = Marionette.ItemView.extend({
    template: 'map.html',
    onShow: function() {

      L.mapbox.accessToken = app.config.mapbox_api_token;
      var map = L.mapbox.map('map', app.config.mapbox_map_id)
        .setView([
          this.getOption('latitude'),
          this.getOption('longitude')
        ], 15);

      var accuracyCircle = L.circle(
        L.latLng(
          this.getOption('latitude'),
          this.getOption('longitude')
        ),
        this.getOption('accuracy'),
        {
          opacity: 1,
          weight: 1,
          fillOpacity: 0.4
        }).addTo(map);

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

      function addMarker(camera) {
        var lat = camera.get('location').lat;
        var lng = camera.get('location').lng;
        //L.marker([lat, lng], {icon: myIcon}).addTo(map);
        L.marker([lat, lng]).addTo(map);
      }

      if(app.cameras.length > 0) {
        app.cameras.forEach(function(camera) {
          console.log('addCamera');
          addMarker(camera);
        });
      }

      app.cameras.listenTo('add', function(camera) {
        console.log('addCamera');
        addMarker(camera);
      });

    },
    setLocation: function(location) {
      var that = this;
      that.map.setView([location.lat, location.lng], 16);

      var accuracyCircle = L.circle(
        L.latLng(
          location.lat,
          location.lng
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