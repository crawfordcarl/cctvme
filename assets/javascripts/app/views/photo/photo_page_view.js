define(function(require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var DateSelectView = require('views/photo/date_select_view');
  var PhotoListView = require('views/photo/photo_list_view');

  var PhotoPageView = Marionette.LayoutView.extend({
    template: 'my_photos.html',
    regions: {
      dateSelection: '.photo-dates',
      photos: '.photos'
    },
    serializeData: function(){
      return {
        timestamp: this.getOption('timestamp')
      };
    },
    onShow: function(){
      this.dateSelection.show(new DateSelectView(this.options));
      this.photos.show(new PhotoListView({
        collection: this.collection
      }));
    }
  });

  return PhotoPageView;
});