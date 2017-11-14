import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Deck extends React.Component{

  render(){
    return (
      <div>
        <Link to={`/decks/${this.props.id}`}> {this.props.title} </Link>
      </div>
    )
  }
}

export default withRouter(Deck)
