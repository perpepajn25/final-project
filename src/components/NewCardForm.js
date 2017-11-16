import React from 'react'
import { connect } from 'react-redux'
import { addCard } from '../actions/cardActions.js'
import { withRouter } from 'react-router-dom'
import { Form, Button, Icon } from 'semantic-ui-react'

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
      <Form className='edit-card'>
        <Form.Group >
          <Form.TextArea
            label='question' value={this.state.question} control='input' placeholder='enter   question' onChange={(event)=>{this.handleChange(event, 'question')}} />
          <Form.TextArea
            label='answer' value={this.state.answer} control='input' placeholder='enter answer' onChange={(event)=>{this.handleChange(event, 'answer')}}/>
          <Button
            className='cust-button edit-button' size='tiny' onClick={this.handleSubmit}>
            <Icon name='add'/>
            add card
          </Button>
          </Form.Group>
      </Form>
    )
  }
}

export default withRouter(connect(null,{ addCard })(NewCardForm))
