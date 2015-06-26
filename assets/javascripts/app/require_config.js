require.config({
  deps: ['initialize_app'],
  paths: {
    'backbone'        : '../../../components/backbone/backbone',
    'marionette'      : '../../../components/marionette/lib/backbone.marionette',
    'hammerjs'        : '../../../components/hammerjs/hammer',
    'jquery-hammerjs' : '../../../components/jquery-hammerjs/jquery.hammer-full',
    'backbone-hammer' : '../../../components/backbone.hammer/backbone.hammer',
    'underscore'      : '../../../components/lodash/dist/lodash',
    'jquery'          : '../../../components/jquery/dist/jquery'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});
