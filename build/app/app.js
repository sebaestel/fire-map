var app = angular.module('gen', [
        'ngSanitize',
        'ui.router',
        'pascalprecht.translate'
    ]
);
app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/home');

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.translations('en', {
        hello: 'Hello'

    });
    $translateProvider.translations('es', {
        hello: 'Hello'
    });
    $translateProvider.preferredLanguage('es');

    $stateProvider
        .state('root', {
            views: {
                'header': {
                    templateUrl: 'templates/header.html',
                    controller: 'headerController'
                },
                'sidebar': {
                    templateUrl: 'templates/sidebar.html',
                    controller: 'sidebarController'
                }
            }
        })
        .state('root.home', {
            url: '/home',
            views: {
                'content@': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        });
});