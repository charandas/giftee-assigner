import coinsTpl from './coinsTpl.html!text'
import angular from 'angular'

export var CoinComponent = function($timeout, CoinSvc, MA_IMAGES) {
    return {
        restrict: 'A',
        scope: {
            user: '='
        },
        template: coinsTpl,
        link: function (scope, element, attrs, controller) {

            var maImages = angular.copy(MA_IMAGES)
            shuffle(maImages)

            var selectedImages = maImages.splice(0,3)
            var coins = selectedImages.map(function(item) { return {user: scope.user, image: item, revealed: false} })

            // Make 1 empty coin
            coins[0].user = null
            shuffle(coins)

            scope.coins = coins
            scope.reveal = (coin) => {
                coin.revealed = true
            }
        }
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

CoinComponent.$inject = ['$timeout', 'CoinSvc', 'MA_IMAGES']