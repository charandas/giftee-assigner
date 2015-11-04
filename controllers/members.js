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

  this.randomUserPromise = UsersFactory.getRandomUser($stateParams.player)
  .then((user) => {
    this.userToAssign = user
  })

  this.opendDialog = (dialogId) => {
    console.log('Opened ' + dialogId)
    LxDialogService.open(dialogId);
  }

  this.closingDialog = () => {
    LxNotificationService.info('Dialog closed!')
  }

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