/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        localStorage: '../bower_components//backbone.localStorage//backbone.localStorage',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone',
    'collections/todos',
    'views/myTodo'
], function (Backbone, TodoCollection, MytodoView) {

    new MytodoView({
        collection : new TodoCollection()
    });

    Backbone.history.start();
});
