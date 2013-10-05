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
        this.proxy.ratings = this.proxy.ratings || [];
        var ratings = this.proxy.ratings;

        // check if ratings filter contains rating
        if (_.contains(ratings, parseInt(stars))){ 
          ratings = _.without(ratings, parseInt(stars));
        }
        else
        {
          // store rating in Array
          this.proxy.ratings.unshift(parseInt(stars));
        }

        // filter array
        if (ratings.length === 0) {
          // remove rating filter if there is no rating
          this.proxy.removeFilter('ratings');
        }
        else {
          this.proxy.filterBy("ratings", { rating: function(val) { 
              return _.contains(ratings, val);
            }
          });
        }

        // store ratings on proxy
        this.proxy.ratings = ratings;
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
        _.bindAll(this, 'selectRating');
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
