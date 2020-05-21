import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/App'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CustomTheme from './main/customTheme'

import Store from './main/store'

import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('wrapper')
)

serviceWorker.unregister()
