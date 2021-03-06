/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/ratings',
    'views/genres',
    'views/sortUI',
    'views/paginate',
    'templates'
], function ($, _, Backbone, RatingsUI, GenresUI, SortUI, Paginate, JST) {
    'use strict';

    var FilteruiView = Backbone.View.extend({
      template: JST['app/scripts/templates/filterUI.ejs'],

      render: function() {
        var layout = this.template();

        var filter = $(this.el).html(layout);
        $(this.el).find('#ratings').append(this.ratings.render());
        $(this.el).find('#genres').append(this.genres.render());
        this.sort.setElement("#sorting");
        this.paginate.setElement("#paginate");
        return filter;
      },

      initialize: function() {
        this.ratings = new RatingsUI();
        this.genres = new GenresUI();
        this.sort = new SortUI();
        this.paginate = new Paginate();
        this.render();
      }

    });

    return FilteruiView;
});
