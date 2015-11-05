import coinsTpl from './coinsTpl.html!text'
import angular from 'angular'

export var CoinComponent = function() {

    return {
        restrict: 'A',
        scope: {
            user: '='
        },
        template: coinsTpl,
        controller: ['$scope', '$q', '$timeout', '$state', 'UsersFactory', 'CoinSvc', 'LxNotificationService', 'MA_IMAGES',
        function($scope, $q, $timeout, $state, UsersFactory, CoinSvc, LxNotificationService, MA_IMAGES) {

            var reloadCoins = function(userToAssign) {

                var deferred = $q.defer()

                UsersFactory.getRandomUser($scope.user)
                    .then((user) => {

                        $scope.userToAssign = user.name
                        $scope.coins = shuffleCoins(user.name)

                        deferred.resolve()
                    })

                return deferred.promise
            }

            var shuffleCoins = function(userToAssign) {
                var maImages = angular.copy(MA_IMAGES)
                shuffle(maImages)

                var selectedImages = maImages.splice(0,3)
                var coins = selectedImages.map(function(item) { return {user: userToAssign, image: item, revealed: false} })

                // Make 1 empty coin
                coins[0].user = null
                shuffle(coins)

                return coins
            }

            var count = 0

            $scope.inProgress = reloadCoins()
            $scope.reveal = (coin) => {

                if (coin.revealed) return

                coin.revealed = true

                if (!coin.user) {
                    count = 0
                    $scope.userToAssign = null
                    LxNotificationService.info('Reloading game since you picked the playful Ma...')

                    $timeout(function() {
                        $scope.inProgress = reloadCoins()
                    }, 3000)

                    return
                }
                count++
                if (count < 2) {
                    LxNotificationService.info('Your giftee could be: ' + coin.user + ' if you get \'em one more time')
                    return
                }

                $scope.inProgress = CoinSvc.recordAttempt($scope.user, coin.user)
                    .then(function() {
                        LxNotificationService.success(coin.user + ' was successfully assigned to you')
                        $timeout(function() {
                            $state.go('finish', {player: $scope.user}, {location: 'replace'})
                        })
                    })
                    .catch(function (reason) {
                        LxNotificationService.error(reason)
                    })
            }

            $scope.message = function(coin) {
                    if (coin.user) {
                        return count < 2 ? 'Before we confirm, try one more': 'Succeeded'
                    } else {
                        return 'Please try again'
                    }

                }
        }]
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

CoinComponent.$inject = []