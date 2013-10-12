/*global define*/

define([
    'underscore',
    'backbone',
    'models/user'
], function (_, Backbone, User) {
    'use strict';

    var session;

    if (session == undefined) { 

    var SessionModel = Backbone.Model.extend({

        urlRoot: 'auth/session',

        isValid: function(callback) {
          var deferred = this.fetch();
          var self = this;
          deferred.done(function(data) {
            self.user = new User(data);
            console.log("auth ok");
          });
          deferred.fail(function() {
            console.log("bang. ");
          });
          deferred.always(function() {
            callback();
          });
        },

        login: function(username, password, success_cb, fail_cb) {
          var self = this;
          $.ajax({type: 'POST', dataType: 'json', 
          contentType: "application/json", 
          url: "/auth/session", 
          data: JSON.stringify({username: username, password: password })})
            .done(function(data) { console.log(data); self.user = new User(data); success_cb() }).fail(fail_cb);
        },

        currentUser: function() {
          if (this.user) {
            return this.user;
          } else {
            return false; 
          }
        }
    });
      session = new SessionModel();
    }

    return session;
});
