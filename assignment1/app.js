(function () {
'use strict';

angular.module('LuchApp', [])
.controller('LuchController', LuchController);

LuchController.$inject = ['$scope'];
//function LuchController
function LuchController($scope) {
  $scope.menu = "";
  $scope.Msg = "empty item (i.e., `, ,) won't count";
  //bonus change font color with different message
  $scope.customStyle = {};
  $scope.turnGreen = function (){
      $scope.customStyle.style = {"color":"green"};
  }

  $scope.turnRed = function() {
    $scope.customStyle.style = {"color":"red"};
  }
  //function checkItem
  $scope.checkItems = function () {
      var strItems=$scope.menu.trim();
      //convert to array
      var lstItems = strItems.split(',');
      var nItems = 0;
      //loop to check empty item
      for (var i=0;i<lstItems.length;i++) {
        if (lstItems[i].trim().length>0){
          nItems+=1;
        }
      }
      //multi cases
      switch (nItems) {
         case 0:
            $scope.Msg ="Please enter data first";
            $scope.turnRed();
            break;
         case 1: case 2: case 3:
            $scope.Msg ="Enjoy!";
            $scope.turnGreen();
            break;
         default:
            $scope.Msg="Too much!";
            $scope.turnGreen();
            break;
      };
  };
}

})();
