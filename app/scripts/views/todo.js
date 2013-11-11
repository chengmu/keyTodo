/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TodoView = Backbone.View.extend({

        $el : '',

        tagName : 'li',

        template: JST['app/scripts/templates/todo.ejs'],

        events : {
            'click .toggle' : 'toggleStatus',
            'dblclick label' : 'edit',
            'blur .edit'  : 'close',
            'keypress .edit' : 'updateOnEnter',
            'click  .destroy' : 'clear',
            'click .view' : 'toggleStatus'
        },


        render : function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));

        },

        initialize : function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        toggleStatus : function () {
            this.model.toggle();
        },

        edit : function () {
            this.$el.addClass('editing');
            this.$el.find('.edit').focus();
        },

        close : function () {

            this.$el.removeClass('editing');
            var text = $.trim(this.$el.find('.edit').val());
            var originText = this.model.get('title');

            this.model.save({'title' : text});

            if (text !== originText) {
                this.model.trigger('change');
            }
        },
        updateOnEnter : function (e) {
            if (e.keyCode !== 13 ) {return;}
            var text = $.trim(this.$el.find('.edit').val());

            if (text === '') {
                this.clear();
            } else {
                this.close();

            }
        },

        clear : function () {
            this.model.destroy();
        }


    });

    return TodoView;
});