import { decksNormalizer } from '../normalizers/decksNormalizer'

export function fetchPublicDecks () {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/public_decks', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        if (json.decks.length === 0) {
          null
        } else {
        let normalizedData = decksNormalizer(json.decks)
        dispatch(setPublicDecks(normalizedData.entities))
        }
      } else {
        alert(json.message)
      }
    })
  }
}

function setPublicDecks (data) {
  return {
    type: 'SET_PUBLIC_DECKS',
    publicDecks: data.decks,
    publicCards: data.cards
  }
}
