(function () {
'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', foundItemsDirective);

    function foundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            menu: '<itemsFound',
            onRemove: '&'
        }
      };
      return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        //menu.found=[];
        menu.search = function () {
            //menu.found=[];
            if ((menu.searchTerm)==''){
              menu.found.splice(0, menu.found.length);
            }
            else{
              menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
            }
            // console.log(menu.found.length);
            // console.log(menu.found);
        };

        menu.removeItem = function (itemIndex) {
            console.log(itemIndex)
            MenuSearchService.removeItem(itemIndex);
        };

      //  menu.title = "You found (" + menu.found.length + " items)";
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            $http.get(ApiBasePath + "/menu_items.json")
            .then(function (response) {
                var items = response.data.menu_items;
                foundItems.splice(0, foundItems.length);
                for (var i = 0; i < items.length; i++) {
                    var description = items[i].description;
                    if (description.toLowerCase().indexOf(searchTerm.toLowerCase().trim()) !== -1) {
                        var item = {
                            short_name: items[i].short_name,
                            name: items[i].name,
                            description: description
                        };
                        foundItems.push(item);
                    }
                }
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
            return foundItems;
        };

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };
    }

})();
