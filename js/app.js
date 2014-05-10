angular.module('ambassadorReferral', ['ngRoute']). //'ambassadorReferralServices', 'ambassadorReferralFilters']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl})
            .otherwise({redirectTo: '/'});
    }])