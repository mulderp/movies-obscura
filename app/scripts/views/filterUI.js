/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/ratings',
    'views/genres',
    'templates'
], function ($, _, Backbone, Ratings, Genres, JST) {
    'use strict';

    var FilteruiView = Backbone.View.extend({
      template: JST['app/scripts/templates/filterUI.ejs'],

      render: function() {
        var layout = this.template();

        var filter = $(this.el).html(layout);
        $(this.el).find('#ratings').append(this.ratings.render());
        $(this.el).find('#genres').append(this.genres.render());
        return filter;
      },

      initialize: function() {
        this.ratings = new Ratings();
        this.genres = new Genres();
        this.render();
      }

    });

    return FilteruiView;
});
