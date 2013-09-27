/*global define*/

define([
    'underscore',
    'backbone',
    'models/rating'
], function (_, Backbone, Rating) {
    'use strict';

    var RatingsCollection = Backbone.Collection.extend({
      model: Rating,
    });

    return RatingsCollection;
});
