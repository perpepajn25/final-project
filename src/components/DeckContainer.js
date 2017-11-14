import React from 'react'
import Deck from './Deck'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class DeckContainer extends React.Component{

  state = {
    input: '',
    category: ''
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render(){
    let filteredDecks = this.props.decks.filter((deck)=>{
      return deck.title.toLowerCase().includes(this.state.input.toLowerCase())
    })
    let decks = filteredDecks.map((deck)=>{
      return <Deck key={deck.id} {...deck}/>
    })
    return (
      <div>
      <Link to='/decks/new'> Create Deck </Link>
        <input onChange={this.handleChange}
        type="text"
        placeholder={"Search your Decks"}
      value={this.state.input}/>
      {decks}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { decks: Object.values(state.decks.byId) }
}

export default connect(mapStateToProps)(DeckContainer)
