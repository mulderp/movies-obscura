/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SessionsNewView = Backbone.View.extend({
        template: JST['app/scripts/templates/sessions/new.ejs']
    });

    return SessionsNewView;
});