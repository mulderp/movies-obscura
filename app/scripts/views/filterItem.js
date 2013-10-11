/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FilteritemView = Backbone.View.extend({
        template: JST['app/scripts/templates/filterItem.ejs'],
        render: function() {
          console.log("********");
          var tmpl = this.template();
          return $(this.el).html(tmpl);
        }
    });

    return FilteritemView;
});
