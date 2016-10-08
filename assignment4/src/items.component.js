(function () {
'use strict';

angular.module('data')
.component('menuItems', {
  templateUrl: 'src/templates/items.html',
  bindings: {
    items: '<'
  }
});

})();
