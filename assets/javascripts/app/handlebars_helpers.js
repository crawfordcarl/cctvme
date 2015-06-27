define(function(require) {
  var Handlebars = require('handlebars');

  Handlebars.registerHelper('formatTimestamp', function(timestamp){
    return new Date(timestamp * 1000).toLocaleString();
  });

  Handlebars.registerHelper('ifEqual', function(a, b, opts){
    if(a == b)
      return opts.fn(this);
    else
      return opts.inverse(this);
  })
});