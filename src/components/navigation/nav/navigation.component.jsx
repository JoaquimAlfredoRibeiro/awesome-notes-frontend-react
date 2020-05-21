import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import { Translate } from 'react-redux-i18n'

import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountButton from '../header/AccountButton.component'
import LanguagePicker from '../header/LanguagePicker.component'
import NoteIcon from '@material-ui/icons/Note'
import ArchiveIcon from '@material-ui/icons/Archive'
import TodayIcon from '@material-ui/icons/Today'
import ListAltIcon from '@material-ui/icons/ListAlt'

import navigationStyles from './navigation.styles'
import FooterComponent from '../footer/Footer.component'

const styles = navigationStyles

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      anchorEl: null,
    }

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  redirect = (link) => {
    this.props.history.push(link)
  }

  currentTab(path) {
    switch (path) {
      case '/':
        return <Translate value="tabs.notes" />
      case '/today':
        return <Translate value="tabs.today" />
      case '/finished':
        return <Translate value="tabs.archived" />
      default:
        return ''
    }
  }

  isTabActive(selectedTab) {
    return selectedTab === this.props.history.location.pathname
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    if (
      this.props.isAuthenticated &&
      this.props.history.location.pathname !== '/auth'
    ) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              style={{ marginRight: '10px' }}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography color="inherit" className={classes.AppBarTypography}>
                {this.currentTab(this.props.history.location.pathname)}
              </Typography>

              <LanguagePicker />

              <AccountButton />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              ),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <div
                className={classes.logoDiv}
                onClick={() => this.redirect('/')}
              >
                <NoteIcon color="primary" fontSize="default" />
                <h3
                  className={classes.backgrounColorText}
                  style={{ marginRight: '-12px' }}
                >
                  <Translate value={'app.name'} />
                </h3>
              </div>
              <IconButton
                onClick={this.handleDrawerClose}
                aria-owns={open ? 'menu-appbar' : null}
              >
                <ChevronLeftIcon className={classes.backgrounColorText} />
              </IconButton>
            </div>

            <Divider />
            <List className={classes.sidebarList}>
              <ListItem
                className={
                  this.isTabActive('/')
                    ? classes.activeSidebarButton
                    : classes.sidebarButton
                }
                button
                onClick={() => this.redirect('/')}
                key={'notes'}
              >
                <ListItemIcon>
                  <ListAltIcon className={classes.backgrounColorText} />
                </ListItemIcon>
                <ListItemText
                  className={classes.backgrounColorText}
                  primary={<Translate value={'tabs.notes'} />}
                />
              </ListItem>
              <ListItem
                className={
                  this.isTabActive('/today')
                    ? classes.activeSidebarButton
                    : classes.sidebarButton
                }
                button
                onClick={() => this.redirect('/today')}
                key={'today'}
              >
                <ListItemIcon>
                  <TodayIcon className={classes.backgrounColorText} />
                </ListItemIcon>
                <ListItemText
                  className={classes.backgrounColorText}
                  primary={<Translate value={'tabs.today'} />}
                />
              </ListItem>
              <ListItem
                className={
                  this.isTabActive('/finished')
                    ? classes.activeSidebarButton
                    : classes.sidebarButton
                }
                button
                onClick={() => this.redirect('/finished')}
                key={'finished'}
              >
                <ListItemIcon>
                  <ArchiveIcon className={classes.backgrounColorText} />
                </ListItemIcon>
                <ListItemText
                  className={classes.backgrounColorText}
                  primary={<Translate value={'tabs.archived'} />}
                />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
            <FooterComponent styles={{ position: 'absolute', bottom: 0 }} />
          </main>
        </div>
      )
    } else {
      return <div>{this.props.children}</div>
    }
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authorization.isAuthenticated,
})

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(withStyles(styles, { withTheme: true })(MiniDrawer))
)
