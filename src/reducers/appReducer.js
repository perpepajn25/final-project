import { combineReducers } from 'redux'
import userReducer from './userReducer'
import deckReducer from './deckReducer'
import cardReducer from './cardReducer'
import publicDeckReducer from './publicDeckReducer'
import publicCardReducer from './publicCardReducer'

const appReducer = combineReducers({
    user: userReducer,
    decks: deckReducer,
    cards: cardReducer,
    publicDecks: publicDeckReducer,
    publicCards: publicCardReducer
  })


export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
    localStorage.removeItem('token')
  }

  return appReducer(state, action)
}
