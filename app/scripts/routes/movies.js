/*global define*/

define([
    'jquery',
    'backbone',
    'views/app'
], function ($, Backbone, App) {
    'use strict';

    var MoviesRouter = Backbone.Router.extend({
        routes: {
            '/movies/:id': 'showMovie',
            '': 'index'
        },

        index: function() {
            this.app = new App({el: 'body'});
        },

        showMovie: function() {
          console.log("showMovie");

        }

    });

    return MoviesRouter;
});
