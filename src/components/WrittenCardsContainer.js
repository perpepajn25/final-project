import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Button, Form, Icon } from 'semantic-ui-react'


class WrittenCardsContainer extends React.Component {

  state = {
    counter: 0,
    answer: '',
    comparing: false
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      comparing: true
    })
  }

  handleChange = (event) => {
    this.setState({
      answer: event.target.value
    })
  }

  handleNext = () => {
    this.setState({
      counter: this.state.counter + 1,
      answer: '',
      comparing: false
    })
  }

  handleBack = () => {
    this.setState({
      counter: this.state.counter - 1,
      answer: '',
      comparing: false
    })
  }


  render(){
    let cardId = this.props.deck.cards[this.state.counter]
    let card = this.props.cards.byId[cardId]
    return (
      <div className='single-card-containter'>
        <Grid.Row>
          <div className='flip-card-single' onClick={this.handleFlip}>
            <div className='flip-card-content'> <h4>Q.</h4>  <p>{card.question}</p></div>
         </div>
       </Grid.Row>
        <Grid.Row>
          {this.state.comparing ? (
            <div>
               <h3> You're Answer: {this.state.answer}</h3>
              {this.state.answer.toLowerCase().trim() === card.answer.toLowerCase().trim() ? <Icon name='checkmark box'/> : <Icon name='x'/>}
               <h3> Correct Answer: {card.answer}</h3>
               {this.state.counter === this.props.deck.cards.length-1 ? <Button onClick={this.handleBack}> repeat Quiz </Button> :
               <Button onClick={this.handleNext}> next </Button>}
             </div>) : (
            <div>
               <Form>
                 <Form.TextArea
                    value={this.state.answer} control='input' placeholder='enter answer' onChange={this.handleChange}/>
                  <Button onClick={this.handleSubmit}> answer </Button>
               </Form>
            </div>
      )
      }
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
  let deck = state.decks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cards: shuffleArray(deck.cards)},
    cards: state.cards }
}

export default withRouter(connect(mapStateToProps)(WrittenCardsContainer))
