define(function(require){
  var Marionette = require('marionette');

  var NavButtonsView = Marionette.ItemView.extend({
    template: 'nav_buttons.html',
    initialize: function(options){
      this.listenTo(options.router, 'route', this.onRouteChanged);
    },
    onRouteChanged: function(route){
      this.$('a').removeClass('active');
      if (route) {
        this.$('a.nav-'+route.toLowerCase()).addClass('active');
      }
    }
  });

  return NavButtonsView;
});