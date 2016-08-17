var axios = require('axios')

// just in case you get rate limited, do later
// var id = 'YOUR_CLIENT_ID'
// var sec = 'YOUR_SECRET_ID'
// var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username)
}

var helpers = {
  getPlayersInfo: function (players) {
    // fetch data from gitHub
    return axios.all(players.map(function (username) {
      // Get a promise for each username in the passed array
      return getUserInfo(username)
    })).then(function (info) {
      // Invoked once all promises have resolved
      // console.log('INFO', info)
      return info.map(function (user) {
        // We're only interested in the .data field of each object
        return user.data
      })
    }).catch(function (err) {
      // Just in case something goes wrong...
      console.warn('Error in getPlayersInfo', err)
    })
  }
}

module.exports = helpers
