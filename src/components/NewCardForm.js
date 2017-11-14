import React from 'react'
import { connect } from 'react-redux'
import { addCard } from '../actions/cardActions.js'
import { withRouter } from 'react-router-dom'

class NewCardForm extends React.Component{
  state={
    deck_id: this.props.match.params.id,
    question: '',
    answer: ''
  }

  handleChange=(event,key)=>{
    this.setState({
      [key]: event.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addCard(this.state)
    this.props.history.push(`/decks/${this.state.deck_id}`)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Question</label>
          <input type='text' name='question' onChange={(event) => {this.handleChange(event,'question')}}/>
          <label>Answer</label>
          <input type='text' name='answer' onChange={(event) => {this.handleChange(event,'answer')}}/>
          <button> Add Card </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null,{ addCard })(NewCardForm))
