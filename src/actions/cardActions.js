export function addCard(card) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/cards', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({card: card})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        dispatch(setCard(json))
      } else {
        alert(json.message)
      }
    })
  }
}

export function deleteCard(cardId, deckId) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/cards/${cardId}`, {
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
        dispatch({type: 'DELETE_CARD', cardId, deckId})
      } else {
        alert(json.message)
      }
    })
  }
}

export function editCard(card) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/cards/${card.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({card: card})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.message){
        dispatch(setEdittedCard(json))
      } else {
        alert(json.message)
      }
    })
  }
}

function setCard(data){
  return {
    type: 'ADD_CARD',
    card: data
  }
}

function setEdittedCard(data){
  return {
    type: 'EDIT_CARD',
    card: data
  }
}
