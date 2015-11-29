import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import ConnectPage from './containers/ConnectPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConnectPage} />
  </Route>
)

// <Route path="/counter" component={CounterPage} />
