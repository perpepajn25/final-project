import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeck } from '../actions/deckActions.js'
import { withRouter } from 'react-router-dom'
import { Button, Divider, Form } from 'semantic-ui-react'

const options = [
          { key: 'math', text: 'Mathematics', value: 'Mathematics' },
          { key: 'lang arts', text: 'Language Arts', value: 'Language Arts' },
          { key: 'art', text: 'Art', value: 'Art' },
          { key: 'social studies', text: 'Social Studies', value: 'Social Studies' },
          { key: 'foreign language', text: 'Foreign Language', value: 'Foreign Language' },
          { key: 'science', text: 'Science', value: 'Science' },
          { key: 'computer science', text: 'Computer Science', value: 'Computer Science' },
          { key: 'other', text: 'Other', value: 'Other' }
        ]

class NewDeckForm extends Component{

  state = {
    counter: 5,
    title: '',
    cards: {},
    cardIds: [1,2,3,4,5],
    public: true,
    subject: ''
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

  handleChange = (event,key) => {
    if (key === 'subject') {
      this.setState({
        subject: event.target.innerText
      })
    } else if (key === 'title'){
      this.setState({
        title: event.target.value
      })
    } else if (key === 'public') {
      setTimeout(()=>{
        this.setState({
          public: !this.state.public
        })
      }, 100)
    }
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
      cards: filteredCards,
      public: this.state.public,
      subject:this.state.subject
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
          <Form.Group>
          <h4 className='form-field-label'>{i+1}.</h4>
            <Form.TextArea data-id={cardId} label='question' control='input' placeholder='enter question' onChange={(event)=>{this.handleCardChange(event, 'question')}} />
            <Form.TextArea data-id={cardId} label='answer' control='input' placeholder='enter answer' onChange={(event)=>{this.handleCardChange(event, 'answer')}}/>
          <Button className='delete-field-button' icon='delete' size='small' data-id={cardId} onClick={this.removeCardField}/>
          </Form.Group>
        </div>
      )
    })
  }


  render(){
    return(
      <div className='create-deck-container'>
        <Form onSubmit={this.handleCreateDeck} className='create-deck-form' size='large' id='create-deck'>
          <Form.Field label='title' control='input' placeholder='enter title'  onChange={(event)=> {this.handleChange(event, 'title')}}/>
          <Form.Group>
            <Form.Select className='subject-dropdown' label='Subject' options={options} placeholder='Subject' onChange={(event)=> {this.handleChange(event, 'subject')}}/>
            <Form.Radio  className='privacy-toggle' toggle label={this.state.public ? 'Public' : 'Private'} onChange={(event)=>{this.handleChange(event, 'public')}}/>
          </Form.Group>
            {this.generateInputFields()}
            <Button onClick={this.handleAddCardField}> + Card </Button>
          <Divider />
          <Button type='submit'> Create Deck </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(connect(null, { createDeck })(NewDeckForm))
