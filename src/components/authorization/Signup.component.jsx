import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

import {
  changeIsLoginActive,
  registerUser,
  clearErrors,
} from './AuthorizationActions'

var I18n = require('react-redux-i18n').I18n
const styles = AuthorizationStyles

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoginActive: this.props.isLoginActive,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeIsLoginActive() {
    this.props.clearErrors()
    this.props.changeIsLoginActive(!this.state.isLoginActive)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    }
    this.props.registerUser(user)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        errors: props.errors,
      }
    }

    return null
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <Translate value="login.signup" />
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label={<Translate value="login.firstName" />}
                  autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.firstName}
                  error={Boolean(
                    `${_.get(errors, ['fields', 'firstName'], '')}`
                  )}
                  helperText={I18n.t(
                    `loginValidation.${_.get(
                      errors,
                      ['fields', 'firstName'],
                      ''
                    )}`
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label={<Translate value="login.lastName" />}
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleInputChange}
                  value={this.state.lastName}
                  error={Boolean(
                    `${_.get(errors, ['fields', 'lastName'], '')}`
                  )}
                  helperText={I18n.t(
                    `loginValidation.${_.get(
                      errors,
                      ['fields', 'lastName'],
                      ''
                    )}`
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={<Translate value="global.email" />}
                  name="email"
                  autoComplete="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  error={Boolean(`${_.get(errors, ['fields', 'email'], '')}`)}
                  helperText={I18n.t(
                    `loginValidation.${_.get(errors, ['fields', 'email'], '')}`
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label={<Translate value="global.user" />}
                  name="username"
                  autoComplete="username"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  error={Boolean(
                    `${_.get(errors, ['fields', 'username'], '')}`
                  )}
                  helperText={I18n.t(
                    `loginValidation.${_.get(
                      errors,
                      ['fields', 'username'],
                      ''
                    )}`
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={<Translate value="login.password" />}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  error={Boolean(
                    `${_.get(errors, ['fields', 'password'], '')}`
                  )}
                  helperText={I18n.t(
                    `loginValidation.${_.get(
                      errors,
                      ['fields', 'password'],
                      ''
                    )}`
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repeatPassword"
                  label={<Translate value="login.repeatPassword" />}
                  type="password"
                  id="repeatPassword"
                  autoComplete="current-password"
                  onChange={this.handleInputChange}
                  value={this.state.repeatPassword}
                  error={Boolean(
                    `${_.get(errors, ['fields', 'repeatPassword'], '')}`
                  )}
                  helperText={I18n.t(
                    `loginValidation.${_.get(
                      errors,
                      ['fields', 'repeatPassword'],
                      ''
                    )}`
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Translate value="login.signup" />
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => this.changeIsLoginActive()}
                >
                  <Translate value="login.accountPrompt" />
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoginActive: state.authorization.isLoginActive,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { changeIsLoginActive, registerUser, clearErrors },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Signup))
