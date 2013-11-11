/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TodoModel = Backbone.Model.extend({
        defaults : {
            'title'     : '',
            'completed' : false
        },
        toggle : function () {
            this.save({
                completed : !this.get('completed')
            });
        }
    });

    return TodoModel;
});