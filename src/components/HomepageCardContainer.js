import React from 'react'
import { connect } from 'react-redux'
import HomePageCard from './HomePageCard'
import { Link, withRouter } from 'react-router-dom'
import { deleteDeck } from '../actions/deckActions.js'


class HomepageCardContainer extends React.Component {

  handleDeleteDeck = (event) => {
    this.props.deleteDeck(this.props.deck.id, this.props.cards.allId)
    this.props.history.push('/decks')
  }

  render(){
    let cards = this.props.deck.cards.map(cardId => {
      return <HomePageCard key={cardId} {...this.props.cards.byId[cardId]} />
    })
    return (

      <div>
      <button onClick={this.handleDeleteDeck}> Delete </button>
      <Link to='/decks'> Home </Link>
      <Link to={`/decks/${this.props.deck.id}/cards/new`}> Add New Card </Link>
      <Link to={`/decks/${this.props.deck.id}/flashcards`}> Flashcards </Link>
      <Link to={`/decks/${this.props.deck.id}/write`}> Written Quiz </Link>
      <Link to={`/decks/${this.props.deck.id}/match`}> Match </Link>
      <h4> Stars: {this.props.deck.starCount} </h4>
      <h4> Forks: {this.props.deck.forkCount} </h4>
       {cards}
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  let deck = state.decks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cards: deck.cards, starCount: deck.stars.length, forkCount: deck.forks.length },
    cards: state.cards }
}

export default withRouter(connect(mapStateToProps, { deleteDeck })(HomepageCardContainer))
