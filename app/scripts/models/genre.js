/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GenreModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return GenreModel;
});