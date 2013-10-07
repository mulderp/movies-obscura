/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collectionview',
    'channel',
    'collections/genres',
    'views/filterItem',
    'templates'
], function ($, _, Backbone, CollectionView, channel, Genres, filterItem, JST) {
    'use strict';

    var GenresView = Backbone.CollectionView.extend({
        //template: JST['app/scripts/templates/genres.ejs'],
        el: $("ul#genres"),
        itemView: filterItem,
        events: {
          'click input': 'selectGenre'
        },

        selectGenre: function(ev) {
          var id = $(ev.currentTarget).val();
          var genre = this.collection.get({id: parseInt(id)});
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
          var data = this.collection.toJSON();
          var tmpl = this.template({genres: data});
          return $(this.el).html(tmpl);
        },

        initialize: function() {
          this.listenTo(this.collection, "sync", this.render);
          this.collection.fetch();
        }
    });

    return GenresView;
});
