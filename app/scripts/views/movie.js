/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel',
    'templates'
], function ($, _, Backbone, channel, JST) {
    'use strict';

    var MovieView = Backbone.View.extend({
      template: JST['app/scripts/templates/movie.ejs'],

      tagName: 'article',
      className: 'movie',
      events: {
        'click': 'handleClick'
      },
  
      handleClick: function(ev) {
        console.log('event on ' + this.model.id);
        channel.trigger('movie:selected', this.model.id);

      },

      render: function() {
        var tmpl = this.template(this.model.toJSON());
        $(this.el).html(tmpl)
        $(this.el).attr('data-id', this.model.get('id'));
        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
      },
  
      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
      }

      });

    return MovieView;
});
