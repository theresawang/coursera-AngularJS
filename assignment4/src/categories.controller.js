(function() {
  'use strict';

  angular.module('data')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['items'];
  function CategoriesController(items) {
    var catergories = this;
    catergories.items = items.data;
  };

})();
