import React from 'react'
import { connect } from 'react-redux'
import { editCard } from '../actions/cardActions.js'
import { withRouter } from 'react-router-dom'

class EditCardForm extends React.Component{
  state = {
    id: this.props.card.id,
    question: this.props.card.question,
    answer: this.props.card.answer
  }

  handleChange=(event,key)=>{
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.question !== this.props.card.question || this.state.answer !== this.props.card.answer){
      this.props.editCard(this.state)
      this.props.onEdit()
    }
  }

  handleCancel = (event) => {
    event.preventDefault()
    this.props.onEdit()
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Question</label>
          <input type='text' name='question' value={this.state.question} onChange={(event) => {this.handleChange(event,'question')}}/>
          <label>Answer</label>
          <input type='text' name='answer' value={this.state.answer} onChange={(event) => {this.handleChange(event,'answer')}}/>
          <button> Edit Card </button>
        </form>
        <button onClick={this.handleCancel}> cancel </button>
      </div>
    )
  }
}


export default withRouter(connect(null,{ editCard })(EditCardForm))
