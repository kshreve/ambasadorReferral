angular.module('#appName', ['ngRoute']). //'#appNameServices', '#appNameFilters']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl})
            .otherwise({redirectTo: '/'});
    }])