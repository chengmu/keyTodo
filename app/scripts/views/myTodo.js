/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/todo'
], function ($, _, Backbone, JST, TodoView) {
    'use strict';

    var MytodoView = Backbone.View.extend({

        el : '#todoapp',

        template : JST['app/scripts/templates/myTodo.ejs'],

        events : {
            'keydown #todoInput' : 'creatOnEnter'
        },

        render : function () {
            $(this.el).html(this.template({}));
        },

        initialize : function () {
            this.render();

            this.TodoView = TodoView;

            this.newTodoInput = $('#todoInput');
            this.todoList = $('#todoList');

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);

            this.collection.fetch({'reset' : true});
        },
        creatOnEnter : function (e) {

            var timeMarker = '%';
            var placeMarker = '@';
            var priorityMarker = '#';


            var result = {};

            result.title = $.trim(this.newTodoInput.val());
            // var placeIndex = result.title.indexOf(placeMarker);
            // if ( placeIndex !== -1) {
            //     result.place = result.title.slice()
            // }


            if (e.keyCode !== 13 || result.title === '') { return; }

            if (result.title.slice(0,4) === 'log:') {
                var curTime = new Date();

                result.title = curTime.toTimeString().slice(0,5) + curTime.toDateString()  + result.title.slice(4);
            }


            this.collection.create({
                'title' : result.title
            });

            this.newTodoInput.val('');
        },
        addOne : function (todo) {
            var todoItem = new this.TodoView({model : todo});
            this.todoList.append(todoItem.$el);
        },
        addAll : function () {
            this.todoList.html('');
            this.collection.each(this.addOne, this);
        }
    });

    return MytodoView;
});