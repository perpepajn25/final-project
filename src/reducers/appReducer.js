import { combineReducers } from 'redux'
import userReducer from './userReducer'
import deckReducer from './deckReducer'
import cardReducer from './cardReducer'

const appReducer = combineReducers({
    user: userReducer,
    decks: deckReducer,
    cards: cardReducer
  })


export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
    localStorage.removeItem('token')
  }

  return appReducer(state, action)
}
