/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'channel',
    'templates'
], function ($, _, Backbone, channel, JST) {
    'use strict';

    var RatingsView = Backbone.View.extend({
      template: JST['app/scripts/templates/ratings.ejs'],
      events: {
        'click input': function(ev) {
          var id = $(ev.currentTarget).val();
          if (id != undefined) {
            channel.trigger('ratings:select', id);
          }
          else
          {
            channel.trigger('ratings:reset', id);
            // app.movies.removeAllFilters();
            // app.movies.selectFirst();
          }

        }
      },
      render: function() {
        var tmpl = this.template();
        return $(this.el).html(tmpl);
      }
    });

    return RatingsView;
});
