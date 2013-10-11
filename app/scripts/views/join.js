/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_modal',
    'models/user',
    'templates'
], function ($, _, Backbone, BackboneModal, User, JST) {
    'use strict';

    var JoinView = Backbone.UI.Modal.extend({
        template: JST['app/scripts/templates/join.ejs'],

        render: function(){
          var tmpl = this.template({});
          return $(this.el).html(tmpl);
        },
        initialize: function( options ){
          this.render();
          return Backbone.UI.Modal.prototype.initialize.call(this, options );
        },

        registerUser: function(ev) {
          ev.preventDefault();
          console.log(ev);
          var username = $('input[name=username]').val();
          var password = $('input[name=password]').val();
          var email = $('input[name=email]').val();
          var user = new User({username: username, password: password, email: email});

          var self=this;
          user.save(null, {
              success: function(model, response) {
                console.log(response);
                self.clickClose();

              },
              error: function(model, response) {
                console.log(response);

              }
            } 
          );
        }
    });

    return JoinView;
});
