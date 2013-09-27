/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MoviesuiView = Backbone.View.extend({
        template: JST['app/scripts/templates/moviesUI.ejs']
    });

    return MoviesuiView;
});