export var CoinSvc = function(UsersFactory, $q) {

    return {
        recordAttempt: function(user, toAssign) {

            var deferred = $q.defer()

            UsersFactory.user(toAssign)
                .then(function(userProfile) {
                    if (!userProfile.assigned) {
                        userProfile['assigned'] = user
                        deferred.resolve(userProfile.$save())
                    } else {
                        deferred.reject(toAssign + ' just got assigned to someone else. Try again.')
                    }
                })
                .catch(function(reason) {
                    deferred.reject('Could not fetch user: ' + toAssign)
                })

            return deferred.promise
        }
    }
}

CoinSvc.$inject = ['UsersFactory', '$q']