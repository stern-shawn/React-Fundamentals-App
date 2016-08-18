var axios = require('axios')

// just in case you get rate limited, do later
// var id = 'YOUR_CLIENT_ID'
// var sec = 'YOUR_SECRET_ID'
// var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username)
}

// Fetch username's repos
function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos')
}

// Calculate all stars that user has
function getTotalStars (repos) {
  return repos.data.reduce(function (prev, curr) {
    return prev + curr.stargazers_count
  }, 0)
}

function getPlayersData (player) {
  // get repos
  // getTotalStars
  // return obj with that data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  // return an array to determine the winner
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
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
  },
  battle: function (players) {
    var playerOneData = getPlayersData(players[0])
    var playerTwoData = getPlayersData(players[1])

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {
        console.warn('Error in getPlayersInfo: ', err)
      })
  }
}

module.exports = helpers
