define(function(require) {
  var Marionette = require('marionette');

  var DateSelectView = Marionette.ItemView.extend({
    className: 'date-select',
    template: 'date-select.html',
    events: {
      'change @ui.select': 'dateSelected'
    },
    ui: {
      'select': 'select'
    },
    dateSelected: function(){
      app.router.navigate('myphotos/'+this.ui.select.val(), {trigger: true});
    },
    serializeData: function(){
      return this.options;
    }
  });

  return DateSelectView;
});