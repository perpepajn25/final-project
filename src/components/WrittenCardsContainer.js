import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class WrittenCardsContainer extends React.Component {

  state = {
    counter: 0,
    input: ''
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      input: ''
    })
  }

  handleNext = (event) => {
    this.setState({
      counter: this.state.counter+1,
      input: ''
    })
  }

  render(){
    let cardId = this.props.deck.cards[this.state.counter]
    let card = this.props.cards.byId[cardId]
    return (
      <div>
      <Link to='/decks'> Home </Link>
      <Link to={`/decks/${this.props.deck.id}`}> Deck </Link>
        <div>
          {card.question}
        </div>
        <div>
          <form>
            <input type='text'/>
            <button onClick={this.handleSubmit}> submit answer </button>
          </form>
        </div>
      </div>
    )
  }
}

function shuffleArray(deckCards) {
  let array = [...deckCards]
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  return array
}

function mapStateToProps(state,ownProps){
  let deck = state.decks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cards: shuffleArray(deck.cards)},
    cards: state.cards }
}

export default withRouter(connect(mapStateToProps)(WrittenCardsContainer))
