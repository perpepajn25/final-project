export default function cardReducer(state = {byId:{},allId:[]} , action){
  switch(action.type){
    case 'DECK_LOAD':
    return {
      ...state,
      byId: action.cards,
      allId: Object.keys(action.cards)
    }

    case 'CREATE_DECK_AND_CARDS':
      return {
        ...state,
        byId: {...state.byId, ...action.cards},
        allId: [...state.allId, ...Object.keys(action.cards)]
      }

    case 'DELETE_CARD':
      let cards = Object.assign({}, state.byId)
      delete cards[action.cardId]
      return {
        ...state,
        byId: cards,
        allId: state.allId.filter((card) => {
          return card !== action.cardId
        })
      }

    case 'DELETE_DECK':
      let filteredCards = Object.assign({}, state.byId)
      action.cardIds.forEach((cardId) => {
        delete filteredCards[cardId]
      })
      return {
        ...state,
        byId: filteredCards,
        allId: Object.keys(filteredCards)
      }

    case 'ADD_CARD':
    return {
      ...state,
      byId: {...state.byId, [action.card.id]: action.card},
      allId: [...state.allId, action.card.id]
    }

    case 'EDIT_CARD':
    return {
      ...state,
      byId: {...state.byId, [action.card.id]: action.card}
    }

    default:
      return state
  }
}
