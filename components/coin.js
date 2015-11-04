import coinsTpl from './coinsTpl.html!text'
import angular from 'angular'

export var CoinComponent = function($timeout, CoinSvc, MA_IMAGES) {
    return {
        restrict: 'A',
        scope: {
            row: '='
        },
        template: coinsTpl,
        link: function (scope, element, attrs, controller) {

            var maImages = angular.copy(MA_IMAGES)
            shuffle(maImages)

            var selectedImages = maImages.splice(0,3)
            scope.coins =  selectedImages.map(function(item) { return {image: item} })

            scope.reveal = (coin) => {

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