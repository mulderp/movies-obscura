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
          console.log(this.model);
          var tmpl = this.template({item: this.model.toJSON()});
          return $(this.el).html(tmpl);
        }
    });

    return FilteritemView;
});
