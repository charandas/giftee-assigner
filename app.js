import $ from 'jquery'
import 'julianshapiro/velocity'

import angular from 'angular'
import 'angular-ui-router'
import 'angularfire'

import 'github:lumapps/lumX@0.3.95/dist/lumx.min'

import appTpl from 'views/app.html!text'
import {AppCtrl} from 'controllers/app'


export var app = angular.module('gifteeApp',
    [
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
        }]
    ).run(function() {
        console.log('Running...')
    }).constant('FirebaseUrl', 'https://giftee-app.firebaseio.com/')

$(document).ready(() => {

    angular.bootstrap(document, ['gifteeApp'], {
        strictDi: true
    })

    $('html').addClass('ng-app: gifteeApp')
})