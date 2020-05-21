import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class AuthRequired extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isAuthenticated: '',
      }
    }

    static getDerivedStateFromProps(props) {
      if (!props.isAuthenticated) {
        props.history.push('/auth')
      }

      return null
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.authorization.isAuthenticated,
  })

  return withRouter(connect(mapStateToProps, null)(AuthRequired))
}
