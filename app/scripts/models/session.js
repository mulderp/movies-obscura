/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
        defaults: {
        },

        login: function(success_cb, fail_cb) {
         $.post("/auth/session", {username: '123', password: '456'}).done(success_cb).fail(fail_cb);
       }
    });

    return SessionModel;
});
