/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel'
], function ($, _, Backbone, channel) {
    'use strict';

    var SortuiView = Backbone.View.extend({
       events: {
         'click a#by_title': 'sortByTitle',
         'click a#by_rating': 'sortByRating',
         'click a#by_showtime': 'sortByShowtime',
       },
   
       sortByTitle: function(ev) {
         channel.trigger("sort", {attr: "title", dir: "asc"});
       },
   
       sortByRating: function(ev) {
         channel.trigger("sort", {attr: "rating", dir: "desc"});
       },
   
       sortByShowtime: function(ev) {
         channel.trigger("sort", {attr: "showtime", dir: "asc"});
       }
    });

    return SortuiView;
});
