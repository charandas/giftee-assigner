export var AppCtrl = function ($scope, $state, $http, $firebaseObject, UsersFactory, FIREBASE_ROOT_URL) {

    var self = this

    this.player = null
    this.password = null

    var ref = new Firebase(FIREBASE_ROOT_URL + '/password');
    $scope.toCompare = $firebaseObject(ref);

    $scope.toCompare.$loaded()
    .then(function() {
    })
    .catch(function(err) {
        console.error(err)
    })

    this.login = () => {
        this.isLoggingIn = UsersFactory.users()
            .then((users) => {
                console.log(users)
                var user
                var giftee
                for (let key in users) {
                    if (!key.startsWith('$')) {
                        if (users[key].assigned && (users[key].assigned.toLowerCase() === self.player.toLowerCase()))
                            giftee = users[key]
                        else if(self.player.toLowerCase() === key.toLowerCase()) {
                            user = key
                        }
                    }
                }

                if (!user || giftee ) {
                    $state.go('finish', {player: self.player})
                } else if (this.password === $scope.toCompare.$value) {
                    $state.go('game', {player: self.player.toLowerCase()})
                }
            })
    }

}

AppCtrl.$inject = ['$scope', '$state', '$http', '$firebaseObject', 'UsersFactory', 'FIREBASE_ROOT_URL']
