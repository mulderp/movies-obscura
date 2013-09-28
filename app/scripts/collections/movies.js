/*global define*/

define([
    'underscore',
    'backbone',
    'channel',
    'models/movie'
], function (_, Backbone, channel, Movie) {
    'use strict';

    var MoviesCollection = Backbone.Collection.extend({
        model: Movie,

         url: function(options) {
           if (this.fetchBy) {
             return '/movies/genre/' + this.fetchBy;
           }
           else
           {
             return '/movies/top';
           }
         },
       
         initialize: function() {
           this.deferred = this.fetch();
           var that = this;
           this.on("all", function(name) {
             console.log(name);
           });
         },
       
         // addRatings: function(rating) {
         //   this.ratings = this.ratings || [];
         //   this.ratings.unshift( rating );
         //   var ratings = this.ratings;
         //   this.addFilter('ratings', function(model) { return _.contains(ratings, model.get('rating')) });
         // },
       
         // removeRating: function(rating) {
         //   this.ratings = this.ratings || [];
         //   this.ratings = _.without(this.ratings, rating);
       
         //   if (this.ratings.length === 0) {
         //     this.addFilter('ratings', function(model) { return true });
         //   }
         // },
       
         reload: function() {
           this.reset(this.currentMovies.toJSON())
           console.log(this);
         },
       
       
         // Unselect all models
         resetSelected: function() {
           this.each(function(model) {
               model.set({ selected: false}, {silent: true});
           });
         },
       
         selected: function() {
           var selectedIDs = app.movies.pluck('selected');
           var selected = this.models[_.indexOf(selectedIDs, true)];
           if (selected) {
             return selected.id
           }
           return -1;
         },
       
         getGenres: function() {
           return this.map(function(m) { return m.get('genres') })
         },
       
         //comparator: function(movie) {
         //  // return movie.get('rating');
         //  // return movie.get('showtime');
         //  return movie.get('title');
         //},
       
         // get a model
         getSelected: function() {
           return this.findWhere({id: this.selected()});
         },
       
         // Select a specific model from the collection
         selectByID: function(id) {
           this.resetSelected();
           var movie = this.get(id);
           movie.set({'selected': true}, {silent: true});
           this.trigger('reset');
           return movie.id;
         },
       
         selectNext: function() {
           var selectedIDs = this.pluck('selected');
           var selected = _.indexOf(selectedIDs, true);
           selected += 1;
           if (selected > app.movies.size() - 1) {
             selected = 0;
           }
           this.resetSelected();
           var movie = this.models[selected];
           movie.set({'selected': true}, {silent: true});
           this.trigger('reset');
         },
       
         // select previous movie
         selectPrevious: function() {
           var selectedIDs = this.pluck('selected');
           var selected = _.indexOf(selectedIDs, true);
           selected -= 1;
           if (selected < 0) {
             selected = app.movies.size() - 1;
           }
           this.resetSelected();
           var movie = this.models[selected];
           movie.set({'selected': true}, {silent: true});
           this.trigger('reset');
         },
       
         selectFirst: function() {
           this.resetSelected();
           var movie = this.models[0];
           movie.set({'selected': true}, {silent: true});
           this.trigger('reset');
         },
       
         allSlugs: function() {
           return this.map(function(movie) {
             return movie.slug();
           });
         },
       
       
         selectBySlug: function(slug) {
           this.deferred.done(function() {
             var movie = app.movies.at(_.indexOf(app.movies.allSlugs(), slug));
             var id = movie.get('id');
             app.movies.selectByID(id);
           });
         }
    });

    return MoviesCollection;
});
