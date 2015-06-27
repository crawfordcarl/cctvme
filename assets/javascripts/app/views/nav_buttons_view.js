define(function(require){
  var Marionette = require('marionette');

  var NavButtonsView = Marionette.ItemView.extend({
    template: 'nav_buttons.html'
  });

  return NavButtonsView;
});