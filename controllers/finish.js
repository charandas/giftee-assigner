export var FinishCtrl = function ($stateParams, UsersFactory) {

    var self = this

    self.player = $stateParams.player

    self.loading = UsersFactory.users().then((users) => {
            for (let key in users) {
                if (!key.startsWith('$')) {
                    if (users[key].assigned && (users[key].assigned.toLowerCase() === self.player.toLowerCase()))
                        self.giftee = users[key].name
                    else if(self.player.toLowerCase() === key.toLowerCase()) {
                        self.user = key
                    }
                }
            }
        })

}

FinishCtrl.$inject = ['$stateParams', 'UsersFactory']
