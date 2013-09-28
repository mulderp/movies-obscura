/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel'
], function ($, _, Backbone, channel) {
    'use strict';

    var PaginateView = Backbone.View.extend({
      events: {
        'click #next': 'next',
        'click #previous': 'previous',
        'keypress document': 'handleKeypress'
      },

      next: function(ev) {
        ev.preventDefault();
        console.log("next");
        channel.trigger("paginate", "next");
      },

      previous: function(ev) {
        ev.preventDefault();
        console.log("prev");
        channel.trigger("paginate", "prev");
      },

      handleKeypress: function(ev) {
        console.log(ev);
      }
    });

    return PaginateView;
});
