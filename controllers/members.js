import {Actor, css, Tween} from 'Popmotion/popmotion'

export var MembersCtrl =
  function ($scope,
    $http,
    $firebaseAuth,
    $firebaseObject,
    FIREBASE_ROOT_URL,
    LxDialogService,
    LxNotificationService,
    CoinSvc) {

  var ref = new Firebase(FIREBASE_ROOT_URL + '/users');
  var obj = $firebaseObject(ref);

  obj.$bindTo($scope, 'users')

  this.action = (user) => {
    if (!user.taken)
      user.taken = true
  }

  this.opendDialog = (dialogId) => {
    console.log('Opened ' + dialogId)
    LxDialogService.open(dialogId);
  }

  this.closingDialog = () => {
    LxNotificationService.info('Dialog closed!')
  }

  console.log(CoinSvc)

}

MembersCtrl.$inject = ['$scope',
  '$http',
  '$firebaseAuth',
  '$firebaseObject',
  'FIREBASE_ROOT_URL',
  'LxDialogService',
  'LxNotificationService',
  'CoinSvc'
]