(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // home page default
    $urlRouterProvider.otherwise('/');

    // states - home, categories, items
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categoriesview.html',
            controller: 'CategoriesController as CtrlCat',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('categories.menuitems', {
            url: '/menuitems/{catId}',
            templateUrl: 'src/templates/itemsview.html',
            controller: 'MenuItemsController as CtrlItems',
            resolve: {
                menuitems: ['$stateParams', 'MenuDataService',
                    function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.catId);
                    }]
            }
        });

};

})();
