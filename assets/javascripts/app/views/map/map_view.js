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

      var filterCircle = L.circle(
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

      app.cameras.forEach(function() {

      });
    }
  });

  return MapView;
});