define(function(require) {
  var Handlebars = require('handlebars');

  Handlebars.registerHelper('formatTimestamp', function(timestamp){
    return new Date(timestamp * 1000).toLocaleString();
  });
});