import coinsTpl from './coinsTpl.html!text'

export var CoinComponent = function($timeout, CoinSvc) {
    return {
        restrict: 'A',
        scope: {
            row: '='
        },
        template: coinsTpl,
        link: function (scope, element, attrs, controller) {

            scope.coins = null

            scope.tossCoins = () => {
                if (scope.coins) return

                scope.coins = [coinFlip(), coinFlip(), coinFlip()]
                CoinSvc.rows.push({row: scope.row, coins: scope.coins})
            }

            scope.coinClass = (coinValue) => {
                if (coinValue === 'T') {
                    return 'tails'
                } else if (coinValue === 'H') {
                    return 'heads'
                }
            }
        }
    }
}

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'H' : 'T';
}


CoinComponent.$inject = ['$timeout', 'CoinSvc']