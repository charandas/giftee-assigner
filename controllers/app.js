export var AppCtrl = function ($scope, $state, $http, $firebaseObject, FIREBASE_ROOT_URL) {

    this.password = null

    var ref = new Firebase(FIREBASE_ROOT_URL + '/password');
    $scope.toCompare = $firebaseObject(ref);

    $scope.toCompare.$loaded()
    .then(function() {
        console.log($scope.toCompare)
    })
    .catch(function(err) {
        console.error(err)
    })

    this.login = () => {
        console.log(this.password + ":" + $scope.toCompare.$value)
        if (this.password === $scope.toCompare.$value) {
            $state.go('members')
        }
    }

}

AppCtrl.$inject = ['$scope', '$state', '$http', '$firebaseObject', 'FIREBASE_ROOT_URL']
