export default function publicDeckReducer(state = {byId:{}, allId: []} , action){
  switch(action.type){
    case 'SET_PUBLIC_DECKS':
      return {
        ...state,
        byId: action.publicDecks,
        allId: Object.keys(action.publicDecks)
      }

    default:
      return state
  }
}
