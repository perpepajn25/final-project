import React from 'react'
import { connect } from 'react-redux'
import { deleteCard } from '../actions/cardActions.js'
import EditCardForm from './EditCardForm'
import { Button } from 'semantic-ui-react'

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
          (<div className='homepage-card'>
            <div className='card-buttons'>
              <Button size='tiny' onClick={this.handleDelete} icon='trash'/>
              <Button size='tiny' onClick={this.handleEdit} icon='write'/>
            </div>
            <div className='question'>
              <h4> {this.props.question} </h4>
            </div>
            <div className='answer'>
              <h4> {this.props.answer} </h4>
            </div>
          </div>
            )
      }
    </div>
  )}
}

export default connect(null, { deleteCard })(HomePageCard)
