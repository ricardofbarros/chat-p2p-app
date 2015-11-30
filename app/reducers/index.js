import { combineReducers } from 'redux'
import connection from './connection'
import lobby from './lobby'
import chat from './chat'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  connection,
  lobby,
  chat,
  form: formReducer
})

export default rootReducer
