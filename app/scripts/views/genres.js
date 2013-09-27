/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var GenresView = Backbone.View.extend({
        template: JST['app/scripts/templates/genres.ejs'],
        events: {
          'click input': function(ev) {
            console.log(ev.currentTarget);
          }
        },
        render: function() {
          var tmpl = this.template();
          return $(this.el).html(tmpl);
        }
    });

    return GenresView;
});
