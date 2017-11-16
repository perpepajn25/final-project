export default function publicCardReducer(state = {byId:{}, allId: []} , action){
  switch(action.type){
    case 'SET_PUBLIC_DECKS':
      return {
        ...state,
        byId: action.publicCards,
        allId: Object.keys(action.publicCards)
      }

    default:
      return state
  }
}
