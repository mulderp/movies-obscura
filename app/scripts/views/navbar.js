/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/session',
    'views/login',
    'views/join',
    'templates'
], function ($, _, Backbone, session, LoginView, JoinView,  JST) {
    'use strict';

    var NavbarView = Backbone.View.extend({
      template: JST['app/scripts/templates/navbar.ejs'],
      el: 'header',
      events: {
        'click .login': 'login',
        'click .join': 'join',
        'click .logout': 'logout'
      },
      login: function(ev) {
        ev.preventDefault();
        this.login = new LoginView();
      },
      join: function(ev) {
        ev.preventDefault();
        this.join = new JoinView();
      },
      logout: function(ev) {
        ev.preventDefault();
        session.logout();
      },
      render: function() {
        console.log(session.currentUser());
        var tmpl = this.template({currentUser: session.currentUser()});
        $(this.el).append(tmpl);
        return this;
      },
      initialize: function() {
        this.render();
      }
    });

    return NavbarView;
});
