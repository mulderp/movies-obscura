/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var JoinView = Backbone.View.extend({
        template: JST['app/scripts/templates/join.ejs']
    });

    return JoinView;
});