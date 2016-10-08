(function() {
  'use strict';

  angular.module('data')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuitems'];
  function MenuItemsController(menuitems) {
    this.menuitems = menuitems.data.menu_items.map(function(item) {
      if (!item.small_portion_name) {
        item.small_portion_name = "small";
      };
      if (!item.large_portion_name) {
        item.large_portion_name = "large";
      };
      return item;
    });
    this.catname = menuitems.data.category.name;
  };

})();