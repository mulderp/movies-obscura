/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        defaults: {
          username: '',
          email: ''
        },

        urlRoot: '/auth/create_user'
    });

    return UserModel;
});
