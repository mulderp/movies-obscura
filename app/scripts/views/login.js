/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_modal',
    'templates'
], function ($, _, Backbone, BackboneModal, JST) {
    'use strict';

    var LoginView = Backbone.UI.Modal.extend({
     template: JST['app/scripts/templates/login.ejs'],
     el: '#popup',
	 render: function(){
	 	var tmpl = this.template({});
	 	return $(this.el).html(tmpl);
	 },
     initialize: function( options ){
       console.log('** modal **');
			this.render();
		//	return Backbone.UI.Modal.prototype.initialize.call(this, options );
		}

    });

    return LoginView;
});
