/*global define*/

define([
    'underscore',
    'backbone',
    'models/genre'
], function (_, Backbone, GenreModel) {
    'use strict';

    var GenresCollection = Backbone.Collection.extend({
      model: GenreModel,
      url: '/genres/all',
      initialize: function() {
      }
    });

    return GenresCollection;
});
