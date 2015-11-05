export var CoinSvc = function(UsersFactory, $q) {

    return {
        recordAttempt: function(user, toAssign) {

            return UsersFactory.user(toAssign)
                .then(function(userProfile) {
                    if (!userProfile.assigned) {
                        userProfile['assigned'] = user
                        console.log(userProfile)
                        return userProfile.$save()
                    } else {
                        return $q.reject(toAssign.name + ' got assigned to someone else. Try again.')
                    }
                })
                .catch(function(reason) {
                    $q.reject('Could not fetch user: ' + toAssign)
                })
        }
    }
}   

CoinSvc.$inject = ['UsersFactory', '$q']