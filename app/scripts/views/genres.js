/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel',
    'collections/genres',
    'templates'
], function ($, _, Backbone, channel, Genres, JST) {
    'use strict';

    var GenresView = Backbone.View.extend({
        template: JST['app/scripts/templates/genres.ejs'],
        events: {
          'click input': 'selectGenre'
        },

        selectGenre: function(ev) {
          var id = $(ev.currentTarget).val();
          var genre = this.genres.findWhere({id: parseInt(id)});
          if (genre != undefined) {
            var filter = genre.get('name');
            channel.trigger('genres:select', filter);
          }
          else
          {
            var filter = genre.get('name');
            channel.trigger('genres:reset', filter);
          }
        },

        render: function() {
          var tmpl = this.template({genres: this.genres.toJSON()});
          return $(this.el).html(tmpl);
        },

        initialize: function() {
          this.genres = new Genres();
          this.listenTo(this.genres, "sync", this.render);
          this.genres.fetch();
        }
    });

    return GenresView;
});
