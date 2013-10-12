/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel',
    'models/session',
    'views/like',
    'templates'
], function ($, _, Backbone, channel, session, LikeView, JST) {
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
        if (session.currentUser()) {
          this.$el.append((new LikeView()).el);
          console.log(session.currentUser().toJSON());
        }
        return this;
      },
  
      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(channel, 'login:success', this.render);
      }

      });

    return MovieView;
});
