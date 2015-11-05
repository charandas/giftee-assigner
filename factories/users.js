export var UsersFactory = function($q, $firebaseObject, $timeout, FIREBASE_ROOT_URL) {

    var user = function(username) {
      // create a reference to the database node where we will store our data
      var ref = new Firebase(FIREBASE_ROOT_URL + '/users/');
      var profileRef = ref.child(username);

      var obj = $firebaseObject(profileRef);
      var deferred = $q.defer()
      obj.$loaded(() => {
        deferred.resolve(obj)
      })

      return deferred.promise
    }

    var users = function() {
      // create a reference to the database node where we will store our data
      var ref = new Firebase(FIREBASE_ROOT_URL + '/users/');

      var obj = $firebaseObject(ref);
      var deferred = $q.defer()
      obj.$loaded(() => {
        deferred.resolve(obj)
      })

      return deferred.promise
    }

    var getRandomUser = function(player) {
        var ref = new Firebase(FIREBASE_ROOT_URL + '/users');
        var obj = $firebaseObject(ref);

        var deferred = $q.defer()

        obj.$loaded(() => {

            var keys = Object.keys(obj).filter((item) => {
                return (!item.startsWith('$')) && (item.toLowerCase() !== player.toLowerCase()) && (!obj[item].assigned)
            })

            shuffle(keys)
            deferred.resolve($firebaseObject(ref.child(keys[0])))


        })

        return deferred.promise
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


    return  {
        user: user,
        users: users,
        getRandomUser: getRandomUser
    }

}

UsersFactory.$inject = ['$q', '$firebaseObject', '$timeout', 'FIREBASE_ROOT_URL']

