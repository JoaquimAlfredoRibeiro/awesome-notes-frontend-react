import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Routes from './routes'

import appConstants from '../appConstants'
import setAuthToken from '../components/authorization/setAuthToken'
import jwt_decode from 'jwt-decode'

import { setCurrentUser } from '../components/authorization/AuthorizationActions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      isAuthenticated: false,
    }

    this.loadCurrentUser()
  }

  loadCurrentUser() {
    const token = localStorage.getItem(appConstants.ACCESS_TOKEN)
    if (token !== null && token !== 'undefined') {
      setAuthToken(token)
      const decoded = jwt_decode(token)
      this.props.setCurrentUser(decoded)
    } else {
      this.props.setCurrentUser({})
    }
  }

  render() {
    return <Routes />
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentUser }, dispatch)

export default connect(null, mapDispatchToProps)(App)
