define(function(require){
  var Marionette = require('marionette');

  var LoadingView = Marionette.ItemView.extend({
    template: 'loading.html'
  });

  return LoadingView;
});