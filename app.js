import $ from 'jquery'
import 'julianshapiro/velocity'

import 'firebase'

import angular from 'angular'
import 'angular-animate'
import 'angular-ui-router'
import 'angularfire'

import 'github:lumapps/lumX@0.3.95/dist/lumx.min'

import appTpl from 'views/app.html!text'
import membersTpl from 'views/members.html!text'

import {AppCtrl} from 'controllers/app'
import {MembersCtrl} from 'controllers/members'
import {CoinComponent} from 'components/coin'
import {CoinSvc} from 'components/coinSvc'


export var app = angular.module('gifteeApp',
    [
        'ngAnimate',
        'lumx',
        'ui.router',
        'firebase'

    ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('app', {
                    url: '/',
                    template: appTpl,
                    controller: AppCtrl,
                    controllerAs: 'vm'
                }
            )
            .state('members', {
                    url: '/members',
                    template: membersTpl,
                    controller: MembersCtrl,
                    controllerAs: 'vm'
                }
            )
        }]
    ).run(function() {
        console.log('Running...')
    })
    .constant('FIREBASE_ROOT_URL', 'https://giftee-app.firebaseio.com/')
    .constant('MA_IMAGES', [
            'anandamayi1_eusyna.jpg',
            'anandamayi2_fgsg4n.jpg',
            'anandamayi4_y53fcc.jpg',
            'anandamayi6_myqhzp.jpg',
            'anandamayi7_svv91h.jpg'
        ]
        .map(function(item) {return 'http://res.cloudinary.com/city-corridor/image/upload/v1446662780/' + item})
    )
    .factory('CoinSvc', CoinSvc)
    .directive('coinComponent', CoinComponent)

$(document).ready(() => {

    angular.bootstrap(document, ['gifteeApp'], {
        strictDi: true
    })

    $('html').addClass('ng-app: gifteeApp')
})