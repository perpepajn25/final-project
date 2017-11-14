import { decksNormalizer } from '../normalizers/decksNormalizer'

export function loginUser(user, action) {
  return (dispatch) => {
  dispatch({type: 'LOGGING_IN'})
    fetch(`http://localhost:3000/api/v1/${action}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: user})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        let normalizedData = decksNormalizer(json.decks)
        dispatch(setDecksandCards(normalizedData.entities))
        dispatch(setCurrentUser(json.username, json.id))
        localStorage.setItem('token', json.jwt )
      } else {
        alert(json.message)
      }
    })
  }
}

export function reauthenticateUser(){
  return (dispatch) => {
    dispatch({type: 'LOGGING_IN'})
      fetch(`http://localhost:3000/api/v1/reauth`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(resp => resp.json())
      .then(json => {
        if (!json.message){
          let normalizedData = decksNormalizer(json.decks)
          dispatch(setDecksandCards(normalizedData.entities))
          dispatch(setCurrentUser(json.username, json.id))
        } else {
          alert(json.message)
        }
    })
  }
}

function setDecksandCards(data){
  return {
    type: 'DECK_LOAD',
    decks: data.decks,
    cards: data.cards
  }
}

function setCurrentUser(username, id){
  return {
    type: 'LOGIN_USER',
    username: username,
    id: id
  }
}

export function logoutUser(){
  return {type: 'LOGOUT_USER'}
}
