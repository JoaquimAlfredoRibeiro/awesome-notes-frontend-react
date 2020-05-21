import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'
import { reducer as toastrReducer } from 'react-redux-toastr'

import authorizationReducer from '../components/authorization/AuthorizationReducer'
import errorReducer from '../components/authorization/ErrorReducer'
import noteReducer from '../components/notes/NotesReducer'

const rootReducer = combineReducers({
  i18n: i18nReducer,
  toastr: toastrReducer,
  authorization: authorizationReducer,
  notes: noteReducer,
  errors: errorReducer,
})

export default rootReducer
