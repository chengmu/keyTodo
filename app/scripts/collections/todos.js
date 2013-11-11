/*global define*/

define([
    'underscore',
    'backbone',
    'localStorage',
    'models/todo'
], function (_, Backbone, LocalStorage, TodosModel) {
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        model: TodosModel,

        localStorage: new LocalStorage('todos-mine'),

    });

    return TodosCollection;
});