import React from 'react'
import { connect } from 'react-redux'
import FlipCard from './FlipCard'
import { Link, withRouter } from 'react-router-dom'


class FlashCardsContainer extends React.Component {

  render(){
    let cards = this.props.deck.cards.map(cardId => {
        return <FlipCard key={cardId} {...this.props.cards.byId[cardId]} />
    })
    return (
      <div>
      <Link to={`/decks/${this.props.deck.id}/flashcards/play`}> Play </Link>
        <div className='container'>
          <div className='flex-container'>
           {cards}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  let deck = state.decks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cards: deck.cards},
    cards: state.cards }
}

export default withRouter(connect(mapStateToProps)(FlashCardsContainer))
