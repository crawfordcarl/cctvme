define(function(require) {
  var Marionette = require('marionette');

  var DateSelectView = Marionette.ItemView.extend({
    tagName: 'select',
    className: 'date-select',
    template: 'date-select.html',
    serializeData: function(){
      var data = {
        timestamps: this.collection.toJSON(),
        timestamp: this.getOption('timestamp')
      };
      return data;
    }
  });

  return DateSelectView;
});