/*global define*/

define([
    'jquery',
    'backbone',
    'collections/movies',
    'views/filterUI',
    'views/moviesUI',
], function ($, Backbone, Movies, FilterUI, MoviesUI) {
    'use strict';

    var MoviesRouter = Backbone.Router.extend({
        routes: {
            '/movies/:id': 'showMovie',
            '': 'index'
        },

        index: function() {
            var movies = new Movies();
            this.filterUI = new FilterUI({el: '#filter'});
            this.moviesUI = new MoviesUI({el: '#movies', collection: movies});
        },

        showMovie: function() {
          console.log("showMovie");

        }

    });

    return MoviesRouter;
});
