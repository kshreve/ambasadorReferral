angular.module('ambassadorReferral', ['ngRoute']). //'ambassadorReferralServices', 'ambassadorReferralFilters']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl})
            .when('/landing/',{templateUrl: 'partials/landing.html', controller: LandingCtrl})
            .when('/:param1',{redirectTo: function(routeParams){ return "/landing/?link="+routeParams.param1;}})
    }])