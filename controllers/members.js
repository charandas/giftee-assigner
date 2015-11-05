import {Actor, css, Tween} from 'Popmotion/popmotion'

export var MembersCtrl =
  function ($scope,
    $http,
    $firebaseAuth,
    $firebaseObject,
    $stateParams,
    FIREBASE_ROOT_URL,
    LxDialogService,
    LxNotificationService,
    UsersFactory,
    CoinSvc) {

  this.user = $stateParams.player

}

MembersCtrl.$inject = ['$scope',
  '$http',
  '$firebaseAuth',
  '$firebaseObject',
  '$stateParams',
  'FIREBASE_ROOT_URL',
  'LxDialogService',
  'LxNotificationService',
  'UsersFactory',
  'CoinSvc'
]