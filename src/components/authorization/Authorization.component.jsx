import React from 'react'
import { connect } from 'react-redux'

import If from '../common/If'

import { withStyles } from '@material-ui/core/styles'
import AuthorizationStyles from './Authorization.styles'
import LanguagePicker from '../navigation/header/LanguagePicker.component'
import Signup from './Signup.component'
import Signin from './Signin.component'
import { Paper, Typography, Grid } from '@material-ui/core'
import { Translate } from 'react-redux-i18n'

const styles = AuthorizationStyles

class Authorization extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoginActive: this.props.isLoginActive,
    }
  }

  render() {
    const { classes } = this.props
    const { isLoginActive } = this.props

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={8} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <div className={classes.lanPicker}>
              <LanguagePicker />
            </div>
            <div className={classes.mainForm}>
              <Typography variant="h4" align="center">
                <Translate value="app.name" />
              </Typography>
              <If test={isLoginActive}>
                <Signin />
              </If>
              <If test={!isLoginActive}>
                <Signup />
              </If>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoginActive: state.authorization.isLoginActive,
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles, { withTheme: true })(Authorization))
