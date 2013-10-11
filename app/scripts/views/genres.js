/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collectionview',
    'channel',
    'collections/genres',
    'views/filterItem',
    'templates'
], function ($, _, Backbone, CollectionView, channel, Genres, filterItem, JST) {
    'use strict';

    var GenresView = Backbone.CollectionView.extend({
        //template: JST['app/scripts/templates/genres.ejs'],
        el: $("ul#genres"),
        modelView: filterItem,

        initialize: function() {
          Backbone.CollectionView.prototype.initialize.apply( this, arguments );
          // this.listenTo(this.collection, "sync", this.render);
        }
    });

    return GenresView;
});
