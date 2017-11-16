import React from 'react'
import { connect } from 'react-redux'
import HomePageCard from './HomePageCard'
import { Link, withRouter } from 'react-router-dom'
import { deleteDeck } from '../actions/deckActions.js'
import { Button, Icon } from 'semantic-ui-react'


class HomepageCardContainer extends React.Component {

  handleDeleteDeck = (event) => {
    this.props.deleteDeck(this.props.deck.id, this.props.deck.cards)
    this.props.history.push('/decks')
  }

  render(){
    let cards = this.props.deck.cards.map(cardId => {
      return <HomePageCard key={cardId} {...this.props.cards.byId[cardId]} />
    })
    return (

      <div>
        <div className='deck-buttons' display='none'>
          <Button size='tiny' onClick={this.handleDeleteDeck} > <Icon name='delete'/> delete deck </Button>
          <Link to={`/decks/${this.props.deck.id}/cards/new`}> <Button size='tiny'> <Icon name='add'/>add new card </Button> </Link>
        </div>
        <div className='deck-title'>
          <h2> {this.props.deck.title} </h2>
        </div>
      <div>
          <Button
            color='yellow'
            content='Stars'
            icon='star'
            label={{ basic: true, color: 'yellow', pointing: 'right', content: this.props.deck.starCount }}
            labelPosition='left'
          />
          <Button
            color='teal'
            content='Forks'
            icon='fork'
            label={{ basic: true, color: 'teal', pointing: 'left', content: this.props.deck.forkCount  }}
            labelPosition='right'
            />
          <Icon/>
        </div>
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
