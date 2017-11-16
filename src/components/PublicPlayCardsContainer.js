import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Button, Icon } from 'semantic-ui-react'


class PlayCardsContainer extends React.Component {

  state = {
    counter: 0,
    clicked: false
  }

  handleFlip = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleNext = (event) => {
    event.preventDefault()
    this.setState({
      counter: this.state.counter+1,
      clicked: false
    })
  }

  handleBack = (event) => {
    event.preventDefault()
    this.setState({
      counter: this.state.counter-1,
      clicked: false
    })
  }

  render(){
    let cardId = this.props.deck.cards[this.state.counter]
    let card = this.props.cards.byId[cardId]
    return (
      <div className='single-card-containter'>
        <Grid.Row>
          <div className='flip-card-single' onClick={this.handleFlip}>
           {this.state.clicked ?  <div className='flip-card-content'> <h4>A.</h4> <p>{card.answer}</p></div> : <div className='flip-card-content'> <h4>Q.</h4>  <p>{card.question}</p></div>}
         </div>
       </Grid.Row>
        <Grid.Row>
        <div>
            {this.state.counter === 0 ? null : (
              <Button animated onClick={this.handleBack}>
                  <Button.Content visible>back</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow left' />
                  </Button.Content>
                </Button>)}
            {this.state.counter === this.props.deck.cards.length-1 ? null : (
              <Button animated onClick={this.handleNext}>
                <Button.Content visible>next</Button.Content>
                <Button.Content hidden>
                  <Icon name='right arrow' />
                </Button.Content>
              </Button>)}
        </div>
      </Grid.Row>
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
  let deck = state.publicDecks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cards: shuffleArray(deck.cards)},
    cards: state.publicCards }
}

export default withRouter(connect(mapStateToProps)(PlayCardsContainer))
