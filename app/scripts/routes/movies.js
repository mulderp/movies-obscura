/*global define*/

define([
    'jquery',
    'backbone',
    'collections/ratings',
    'views/filterUI',
    'views/moviesUI',
], function ($, Backbone, Ratings, FilterUI, MoviesUI) {
    'use strict';

    var MoviesRouter = Backbone.Router.extend({
        routes: {
            '/movies/:id': 'showMovie',
            '': 'index'
        },

        index: function() {
            console.log('****');
            var ratings = new Ratings([1,2,3,4,5]);
            var filterUI = new FilterUI({el: '#filter', collection: ratings});
            var moviesUI = new MoviesUI();
        },

        showMovie: function() {
          console.log("showMovie");

        }

    });

    return MoviesRouter;
});
