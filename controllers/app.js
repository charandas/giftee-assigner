import angular from 'angular'
import 'firebase'

export var AppCtrl = function ($scope, $http, $firebaseObject, FirebaseUrl) {

    console.log(FirebaseUrl)

    var ref = new Firebase(FirebaseUrl);
    $scope.data = $firebaseObject(ref);

    $scope.data.$loaded()
      .then(function() {
        console.log($scope.data);
      })
      .catch(function(err) {
        console.error(err);
      });
}

AppCtrl.$inject = ['$scope', '$http', '$firebaseObject', 'FirebaseUrl']
