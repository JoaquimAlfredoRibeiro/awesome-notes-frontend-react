import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { Translate } from 'react-redux-i18n'

import { withStyles } from '@material-ui/core/styles'
import AuthorizationStyles from './Authorization.styles'

import Copyright from '../common/Copyright.component'
import GoogleLogin from 'react-google-login'

import {
  changeIsLoginActive,
  loginUser,
  clearErrors,
} from './AuthorizationActions'

var I18n = require('react-redux-i18n').I18n
const styles = AuthorizationStyles

class Signin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoginActive: this.props.isLoginActive,
      username: 'testUser',
      password: 'user1234',
      errors: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeLoginActive() {
    this.props.clearErrors()
    this.props.changeIsLoginActive(!this.props.isLoginActive)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.loginUser(user, this.props.history)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        errors: props.errors,
      }
    }

    return null
  }

  onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName())
    console.log('Image URL: ' + profile.getImageUrl())
    console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
  }

  responseGoogle = (response) => {
    console.log(response)
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <Translate value="login.signin" />
            </Typography>

            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label={<Translate value="global.user" />}
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.handleInputChange}
                value={this.state.username}
                error={Boolean(`${_.get(errors, ['fields', 'username'], '')}`)}
                helperText={I18n.t(
                  `loginValidation.${_.get(errors, ['fields', 'username'], '')}`
                )}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={<Translate value="login.password" />}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleInputChange}
                value={this.state.password}
                error={Boolean(`${_.get(errors, ['fields', 'password'], '')}`)}
                helperText={I18n.t(
                  `loginValidation.${_.get(errors, ['fields', 'password'], '')}`
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                style={{ marginTop: '5px' }}
              >
                <Translate value="login.tryApp" />
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {<Translate value="login.signin" />}
              </Button>

              <Grid container>
                {/* <Grid item xs>
                  <GoogleLogin
                    clientId="971944479201-ud638blh7kfqktgr97s3arjmpn2k6qhh.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </Grid> */}
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <Translate value="login.forgotPassword" />
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => this.changeLoginActive()}
                  >
                    {<Translate value="login.noAccountPrompt" />}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    )
  }
}

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoginActive: state.authorization.isLoginActive,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeIsLoginActive, loginUser, clearErrors }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(Signin))
)
