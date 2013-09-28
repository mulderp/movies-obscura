/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'obscura',
    'channel',
    'collections/movies',
    'views/movie',
    'templates'
], function ($, _, Backbone, Obscura, channel, Movies, MovieView, JST) {
    'use strict';

    var MoviesuiView = Backbone.View.extend({
      template: JST['app/scripts/templates/moviesUI.ejs'],

      render: function() {
        console.log("***");
        var moviesView = this.proxy.map(function(movie) {
          return (new MovieView({model : movie})).render().el;
        });
        this.$el.html(moviesView);
        //this.renderDetails();
        return this;
      },

      selectGenre: function(genre) {
        var filters = _.keys(this.proxy._filtered._filters)
        if (_.contains(filters, genre)) { 
          this.proxy.removeFilter(genre);
        }
        else
        {
          this.proxy.filterBy(genre, function(m) { 
            return (_.findWhere(m.get('genres'), genre))});
        }
      },

      selectRating: function(stars) {
        var filters = _.keys(this.proxy._filtered._filters);
        var ratingfilter = "rating:" + stars;
        console.log(ratingfilter);
        if (_.contains(filters, ratingfilter)){ 
          this.proxy.removeFilter(ratingfilter);
        }
        else
        {
          this.proxy.filterBy(ratingfilter, function(model) { 
            return model.get('rating') == parseInt(stars);
          });
        }
      },

      sort: function(criteria) {
        this.proxy.setSort(criteria.attr, criteria.dir);
      },

      paginate: function(action) {
        if (action == 'next') {
          this.proxy.nextPage();
        }
        else {
          this.proxy.prevPage();
        }
      },

      initialize: function() {
        this.proxy = new Obscura(this.collection);
        this.proxy.setPerPage(4)
              .setSort('showtime', 'desc');
        this.listenTo(this.collection, 'sync', this.render);
        this.listenTo(this.proxy, 'reset', this.render);
        this.listenTo(channel, 'genres:select', this.selectGenre);
        this.listenTo(channel, 'ratings:select', this.selectRating);
        this.listenTo(channel, 'sort', this.sort);
        this.listenTo(channel, 'paginate', this.paginate);
      }
    });

    return MoviesuiView;
});
