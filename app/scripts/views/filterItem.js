/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FilteritemView = Backbone.View.extend({
        template: JST['app/scripts/templates/filterItem.ejs']
    });

    return FilteritemView;
});