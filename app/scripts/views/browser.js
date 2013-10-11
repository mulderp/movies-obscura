/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'views/filterUI',
    'views/moviesUI',
    'templates'
], function ($, _, Backbone, Movies, FilterUI, MoviesUI, JST) {
    'use strict';

    var BrowserView = Backbone.View.extend({
        template: JST['app/scripts/templates/browser.ejs'],
        initialize: function() {
          var movies = new Movies();
          this.filterUI = new FilterUI({el: '#filter'});
          this.moviesUI = new MoviesUI({el: '#movies', collection: movies});
        }
    });

    return BrowserView;
});
