import React from 'react'
import { connect } from 'react-redux'
import { editCard } from '../actions/cardActions.js'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

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
      <Form className='edit-card'>
        <Form.Group >
          <Form.TextArea
            label='question' value={this.state.question} control='input' placeholder='enter   question' onChange={(event)=>{this.handleChange(event, 'question')}} />
          <Form.TextArea
            label='answer' value={this.state.answer} control='input' placeholder='enter answer' onChange={(event)=>{this.handleChange(event, 'answer')}}/>
          <Button
            className='cust-button edit-button' icon='save' size='tiny' onClick={this.handleSubmit}/>
          <Button
            className='cust-button delete-button' icon='delete' size='tiny' onClick={this.handleCancel}/>
          </Form.Group>
      </Form>
    )
  }
}


export default withRouter(connect(null,{ editCard })(EditCardForm))
