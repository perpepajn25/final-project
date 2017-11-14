import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GameCardAnswers from './GameCardAnswers'
import GameCardQuestions from './GameCardQuestions'

class GameCardsContainer extends React.Component {
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
      return (<GameCardAnswers key={cardId} solved={this.state.solvedAnswers.includes(cardId)} selected={this.state.selectedAnswer === cardId} onSelectAnswer={this.selectAnswer} id={cardId} answer={this.props.cards.byId[cardId].answer}/>)
    })
    let questions = this.props.deck.cardsForQuestions.map((cardId) => {
      return (<GameCardQuestions key={cardId} solved={this.state.solvedQuestions.includes(cardId)}
      selected={this.state.selectedQuestion === cardId} onSelectQuestion={this.selectQuestion} id={cardId} question={this.props.cards.byId[cardId].question}/>)
    })
    return (
      <div>
        <Link to='/decks'> Home </Link>
        <Link to={`/decks/${this.props.deck.id}`}> Deck </Link>
        <h1> {this.state.attempts} </h1>
        <div className="container">
          <div className="flex-container">
            answers
            {answers}
            questions
            {questions}
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
  let deck = state.decks.byId[ownProps.match.params.id]
  return { deck: {id: deck.id, title: deck.title, cardsForAnswers: shuffleArray(deck.cards), cardsForQuestions: shuffleArray(deck.cards)},
    cards: state.cards }
}

export default connect(mapStateToProps)(GameCardsContainer)
