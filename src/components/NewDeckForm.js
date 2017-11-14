import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeck } from '../actions/deckActions.js'
import { withRouter } from 'react-router-dom'

class NewDeckForm extends Component{

  state = {
    counter: 5,
    title: '',
    public: false,
    cards: {},
    cardIds: [1,2,3,4,5]
  }

  handleAddCardField = (event) => {
    event.preventDefault()
    if (this.state.cardIds.length < 120) {
      this.setState({
        counter: this.state.counter+1,
        cardIds: [...this.state.cardIds, this.state.counter+1]
      })
    }
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleCardChange=(event,key)=>{
    this.setState({
      cards: {...this.state.cards,
        [event.target.getAttribute('data-id')]: {
          ...this.state.cards[event.target.getAttribute('data-id')],
          [key]: event.target.value
          }
        }
      })
  }

  handleCreateDeck = (event) => {
    event.preventDefault()
    let cards = Object.values(this.state.cards)
    let filteredCards = cards.filter((card)=>{
      return card.question !== '' && card.answer !== '' && card.question && card.answer
    })
    let deck = {
      title: this.state.title,
      cards: filteredCards
    }
    if (this.state.title.trim()){
    this.props.createDeck(deck)
    this.props.history.push('/decks')
    }
  }

  removeCardField = (event) => {
    event.preventDefault()
    let cards = Object.assign({}, this.state.cards)
    delete cards[event.target.getAttribute('data-id')]
    this.setState({
      cardIds: this.state.cardIds.filter((cardId)=>{
        return `${cardId}` !== event.target.getAttribute('data-id')
      }),
      cards: cards
    })
  }

  generateInputFields = () => {
    return this.state.cardIds.map((cardId,i)=> {
      return (
        <div id={cardId} key={cardId}>
          <label>{i+1}</label>
          <label>Question</label>
          <input data-id={cardId} type='text' onChange={(event)=>{this.handleCardChange(event, 'question')}}/>
          <label>Answer</label>
          <input data-id={cardId} type='text' onChange={(event)=>{this.handleCardChange(event, 'answer')}} />
          <button data-id={cardId} onClick={this.removeCardField}> x </button>
        </div>
      )
    })
  }


  render(){
    return(
      <div>
        <form id="create-deck">
          <label>Title</label>
          <input type='text' onChange={this.handleTitleChange} />
          {this.generateInputFields()}
          <button onClick={this.handleAddCardField}> + card </button>
          <button onClick={this.handleCreateDeck}> create deck </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, { createDeck })(NewDeckForm))

//
// class FormItem extends Component {
//
//
//   state = {
//     answer: "",
//     question: ""
//   }
//
//
//   handleCardChange = (event, key) => {
//     // I want to validate
//     //  if im an answer i want to question etc
//
//     this.setState({
//       [key]: event.target.value
//     })
//     //
//     //
//     // if (this.checkValid()) {
//     //   this.props.handleAdd(this.state, this.props.id)
//     // } else {
//     //   this.props.handleRemove(this.props.id)
//     // }
//
//     /// validate complete form
//   }
//
//
//   checkValid = () => {
//     if (this.state.question !== "" && this.state.answer !== "") {
//       return true
//     } else {
//       return false
//     }
//   }
//
//   render() {
//     const { id } = this.props
//     return (
//       <div id={id} key={id}>
//         <label>{id}</label>
//         <label>Question</label>
//         <input data-id={id} type='text' onChange={(event)=>{this.handleCardChange(event, 'question')}} value={this.state.question}/>
//         <label>Answer</label>
//         <input data-id={id} type='text' onChange={(event)=>{this.handleCardChange(event, 'answer')}} value={this.state.answer} />
//         <button data-id={id} onClick={this.removeCardField}> x </button>
//       </div>
//     )
//   }
// }
