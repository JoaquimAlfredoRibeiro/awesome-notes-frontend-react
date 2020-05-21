import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navigation from '../components/navigation/nav/navigation.component'
import Messages from '../components/common/Messages'
import Authorization from '../components/authorization/Authorization.component'

import UnfinishedNotes from '../components/notes/UnfinishedNotes.component'
import FinishedNotes from '../components/notes/FinishedNotes.component'

export default (props) => (
  <BrowserRouter>
    <div>
      <Navigation>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <UnfinishedNotes today={false} />}
          />
          <Route
            exact
            path="/today"
            component={() => <UnfinishedNotes today={true} />}
          />
          <Route path="/finished" component={FinishedNotes} />
          <Route path="/auth" component={Authorization} />
          <Redirect from="*" to="/" />
        </Switch>
      </Navigation>
      <Messages />
    </div>
  </BrowserRouter>
)
