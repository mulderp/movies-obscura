/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_modal',
    'channel',
    'models/session',
    'templates'
], function ($, _, Backbone, BackboneModal, channel, session, JST) {
    'use strict';

    var LoginView = Backbone.UI.Modal.extend({
     template: JST['app/scripts/templates/login.ejs'],
	 render: function(){
	 	var tmpl = this.template({});
	 	return $(this.el).html(tmpl);
	 },
     initialize: function( options ){
       console.log('** modal **');
       this.render();
       return Backbone.UI.Modal.prototype.initialize.call(this, options );
     },
     login: function(ev) {
       ev.preventDefault();
       console.log(ev);
       var username = $('input[name=username]').val();
       var password = $('input[name=password]').val();
       // var session = new Session({username: username, password: password});
       var self = this;
       session.login(username, password, function(model, response) {
            console.log(response);
            self.clickClose();
          },
          function(model, response) {
            console.log(response);
          }
       );

     }


   });

    return LoginView;
});
