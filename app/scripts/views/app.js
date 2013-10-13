/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/browser',
    'views/navbar',
    'templates',
], function ($, _, Backbone, Browser, navbar, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],

        initialize: function() {
          this.browser = new Browser();
          this.navbar = new navbar();
        }
    });

    return AppView;
});
