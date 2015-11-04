export var CoinSvc = function(UsersFactory) {

    return {
        recordAttempt: function(user, assigned) {
            var userProfile = UsersFactory.user(user)
            console.dir(userProfile)

            userProfile[assigned] = userProfile[assigned] || 0
            userProfile[assigned]++

            console.log(user + ":" + assigned + ":" + userProfile[assigned])

        }
    }
}

CoinSvc.$inject = ['UsersFactory']