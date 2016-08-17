var React = require('react')
// var transparentBg = require('../styles/').transparentBg
var Prompt = require('../components/Prompt')

var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: ''
    }
  },
  handleUpdateUser: function (e) {
    this.setState({
      username: e.target.value
    })
  },
  handleSubmitUser: function (e) {
    e.preventDefault()
    // This var is never used, what's the point?
    // var username = this.state.username
    // This line clears the text in the form field, making it set to placeholder
    this.setState({
      username: ''
    })

    if (this.props.routeParams.playerOne) {
      // go to /battle page
      console.log(this.context)
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      })
    } else {
      // goto /playerTwo page
      console.log(this.context)
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },
  render: function () {
    // console.log(this)
    return (
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateUser}
        header={this.props.route.header}
        username={this.state.username} />
    )
  }
})

module.exports = PromptContainer
