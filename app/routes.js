import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import ConnectPage from './containers/ConnectPage'
import LobbyPage from './containers/LobbyPage'
import ChatPage from './containers/ChatPage'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ConnectPage} />
    <Route path='/lobby' component={LobbyPage} />
    <Route path='/chat/:personId' component={ChatPage} />
  </Route>
)
