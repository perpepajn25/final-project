import React from 'react'
import { connect } from 'react-redux'
import PublicGameCardAnswers from './PublicGameCardAnswers'
import PublicGameCardQuestions from './PublicGameCardQuestions'

class PublicGameCardsContainer extends React.Component {
  state = {
    attempts: 0,
    selectedQuestion: false,
    selectedAnswer: false,
    solvedQuestions: [],
    solvedAnswers: []
  }

  selectAnswer = (cardId) => {
    if (!this.state.selectedAnswer) {
      this.setState({
        selectedAnswer: cardId
      }, ()=>{this.shouldCompare()})
    }
  }

  selectQuestion = (cardId) => {
    if (!this.state.selectedQuestion) {
      this.setState({
        selectedQuestion: cardId
      }, ()=>{this.shouldCompare()})
    }
  }

  shouldCompare = () => {
    if (this.state.selectedQuestion !== false  && this.state.selectedAnswer !== false){
      this.compareCards()
    }
  }

  compareCards = () => {
    let cardByQuestion = this.props.cards.byId[this.state.selectedQuestion]
    let cardByAnswer = this.props.cards.byId[this.state.selectedAnswer]
    if (cardByQuestion.answer === cardByAnswer.answer){
      console.log('Match!')
      setTimeout(()=>{this.setState({
        solvedQuestions: [...this.state.solvedQuestions, this.state.selectedQuestion],
        solvedAnswers: [...this.state.solvedAnswers, this.state.selectedAnswer],
        selectedQuestion: false,
        selectedAnswer: false,
        attempts: this.state.attempts + 1
      })}, 1000)
    } else {
      console.log('Mismatch')
      setTimeout(()=>{this.setState({
        selectedQuestion: false,
        selectedAnswer: false,
        attempts: this.state.attempts + 1
      })}, 2000)
    }
  }

  render(){
    let answers = this.props.deck.cardsForAnswers.map((cardId) => {
      return (<PublicGameCardAnswers key={cardId} solved={this.state.solvedAnswers.includes(cardId)} selected={this.state.selectedAnswer === cardId} onSelectAnswer={this.selectAnswer} id={cardId} answer={this.props.cards.byId[cardId].answer}/>)
    })
    let questions = this.props.deck.cardsForQuestions.map((cardId) => {
      return (<PublicGameCardQuestions key={cardId} solved={this.state.solvedQuestions.includes(cardId)}
      selected={this.state.selectedQuestion === cardId} onSelectQuestion={this.selectQuestion} id={cardId} question={this.props.cards.byId[cardId].question}/>)
    })
    return (
      <div>
        <h1> Attempts: {this.state.attempts} </h1>
        <div className="container vertical-column">
          <h3> Q. </h3>
          <div className='flex-container'>
            {questions}
          </div>
        </div>
        <div className="container vertical-column" style={{left: '50%'}}>
          <h3> A. </h3>
          <div className='flex-container'>
          {answers}
          </div>
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
  let deck = state.publicDecks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cardsForAnswers: shuffleArray(deck.cards), cardsForQuestions: shuffleArray(deck.cards)},
    cards: state.publicCards }
}

export default connect(mapStateToProps)(PublicGameCardsContainer)
