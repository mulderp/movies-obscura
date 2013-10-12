/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LikeView = Backbone.View.extend({
        template: JST['app/scripts/templates/like.ejs'],
        events: {
          submit: 'like'
        },
        like: function(ev) {
          ev.preventDefault();
          $.ajax({type: "POST", url: "/movies/like"});
        },
        render: function() {
          $(this.el).html("<form><input type='submit'>Like</input></form>");
          return this;
        },
        initialize: function() {
          this.render();
        }
    });

    return LikeView;
});
