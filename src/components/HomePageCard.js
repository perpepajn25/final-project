import React from 'react'
import { connect } from 'react-redux'
import { deleteCard } from '../actions/cardActions.js'
import EditCardForm from './EditCardForm'

class HomePageCard extends React.Component{
  state = {
    isBeingEditted: false
  }


  handleDelete = (event) => {
    event.preventDefault()
    this.props.deleteCard(this.props.id, this.props.deck_id)
  }

  handleEdit = (event) => {
    event.preventDefault()
    this.toggleEdit()
  }

  toggleEdit = () => {
    this.setState({
      isBeingEditted: !this.state.isBeingEditted
    })
  }

  render () {
    return (
      <div>
      { this.state.isBeingEditted ? <EditCardForm onEdit={this.toggleEdit} card={this.props}/> :
          (<div>
          <button onClick={this.handleDelete}> Delete Card </button>
          <button onClick={this.handleEdit}> Edit Card </button>
            <div> {this.props.question} </div>
            <div> {this.props.answer} </div>
          </div>)
      }
    </div>
  )}
}

export default connect(null, { deleteCard })(HomePageCard)
