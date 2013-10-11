/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        obscura: '../bower_components/backbone.obscura/backbone.obscura',
        collectionview: '../bower_components/backbone.collectionView/dist/backbone.collectionView'
    }
});

require([
    'backbone', 'routes/movies'
], function (Backbone, MoviesRouter) {
    var router = new MoviesRouter();
    Backbone.history.start();
});
