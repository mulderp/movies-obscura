/*global define*/

define([
    'underscore',
    'backbone',
    'channel'
], function (_, Backbone, channel) {
    'use strict';

    var MovieModel = Backbone.Model.extend({
        defaults: {
          selected: false,
          title: ''
        },

        slug: function() {
          return this.get('title').toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
        },

        toggle: function(id) {
            var that = this;
            if (this.id != id) {
              that.set({selected: false});
            }
            else
            {
              that.set({selected: true});
            }
          },

        containsGenre: function(genre) {
         return _.contains(this.get('genres'), genre);
        },

        initialize: function() {
          this.listenTo(channel, 'movie:selected', this.toggle);
        }
    });

    return MovieModel;
});
