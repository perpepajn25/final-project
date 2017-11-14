export default function reducer(state = {isLoading: false} , action){
  switch(action.type){
    case 'LOGGING_IN':
      return {
        isLoading: true
      }

    case 'LOGIN_USER':
      return {
        username: action.username,
        id: action.id,
        isLoading: false
      }

    default:
      return state
  }
}
