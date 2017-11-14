import { deckNormalizer } from '../normalizers/decksNormalizer'

export function createDeck (deck) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/decks', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({deck: deck})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        let normalizedDeck = deckNormalizer(json)
        dispatch(setDeck(normalizedDeck.entities))
      } else {
        alert(json.message)
      }
    })
  }
}

export function deleteDeck (deckId, cardIds) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/decks/${deckId}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        dispatch({type: 'DELETE_DECK', deckId: deckId, cardIds: cardIds})
      } else {
        alert(json.message)
      }
    })
  }
}

function setDeck (data) {
  return {
    type: 'CREATE_DECK_AND_CARDS',
    deck: data.decks,
    cards: data.cards
  }
}
