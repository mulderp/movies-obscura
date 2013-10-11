/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SignupView = Backbone.View.extend({
        template: JST['app/scripts/templates/signup.ejs']
    });

    return SignupView;
});