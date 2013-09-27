/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var RatingsmodelModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return RatingsmodelModel;
});