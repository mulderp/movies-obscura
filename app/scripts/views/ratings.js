/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var RatingsView = Backbone.View.extend({
      template: JST['app/scripts/templates/ratings.ejs'],
      events: {
        'click input': function(ev) {
          console.log($(ev.currentTarget).val());

        }
      },
      render: function() {
        var tmpl = this.template();
        return $(this.el).html(tmpl);
      }
    });

    return RatingsView;
});
