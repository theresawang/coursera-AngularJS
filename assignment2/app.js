(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyListController', ToBuyListController)
.controller('AlreadyBoughtListController', AlreadyBoughtListController)
.service('ShoppingListService', ShoppingListService);
//.controller('ShoppingListController', ShoppingListController);
var ToBuyList = [
            {
              name:"cookies",
              quantity: "5 bags"
            },
            {
              name:"icecream",
              quantity: "2 boxes"
            },
            {
              name:"peanut",
              quantity: "3 bottles"
            },
            {
              name:"apple",
              quantity: "2 bags"
            },
            {
              name:"milk",
              quantity: "1 bottle"
            },
            {
              name:"egg",
              quantity: "2 dozens"
            }
]

ToBuyListController.$inject = ['ShoppingListService'];
function ToBuyListController(ShoppingListService) {
  var showList = this;
  showList.items = ShoppingListService.ToBuyItems();

  showList.checkOff = function (itemIndex) {
    //console.log("Index: " + itemIndex);
    ShoppingListService.moveItem(itemIndex);
  };
}

AlreadyBoughtListController.$inject = ['ShoppingListService'];
function AlreadyBoughtListController(ShoppingListService) {
  var boughtList = this;
  boughtList.items = ShoppingListService.AlreadyBoughtItemes();
}

function ShoppingListService() {
  var service = this;

  // List of shopping items
  var ToBuyItems = ToBuyList;
  var AlreadyBoughtItemes = [];

  service.moveItem = function (itemIndex) {
    var item = {
      name: ToBuyItems[itemIndex].name,
      quantity: ToBuyItems[itemIndex].quantity
    };
    AlreadyBoughtItemes.push(item);
    ToBuyItems.splice(itemIndex,1)
  };

  service.ToBuyItems = function () {
    return ToBuyItems;
  };

  service.AlreadyBoughtItemes = function () {
    return AlreadyBoughtItemes;
  };
}

})();
