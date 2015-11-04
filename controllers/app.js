export var AppCtrl = function ($scope, $state, $http, $firebaseObject, FIREBASE_ROOT_URL) {

    this.player = null
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
        if (this.password === $scope.toCompare.$value) {
            $state.go('members', {player: this.player.toLowerCase()})
        }
    }

}

AppCtrl.$inject = ['$scope', '$state', '$http', '$firebaseObject', 'FIREBASE_ROOT_URL']
