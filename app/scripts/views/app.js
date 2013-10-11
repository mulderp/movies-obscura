/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/login',
    'views/join',
    'views/browser',
    'templates',
], function ($, _, Backbone, LoginView, JoinView, Browser, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],
        events: {
          'click .login': 'login',
          'click .join': 'join'
        },
        login: function(ev) {
          ev.preventDefault();
          this.login = new LoginView();
        },
        join: function(ev) {
          ev.preventDefault();
          this.join = new JoinView();
        },

        initialize: function() {
          this.browser = new Browser();
        }
    });

    return AppView;
});
