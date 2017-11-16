import React from 'react'
import Deck from './Deck'
import { connect } from 'react-redux'

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
        <div className='ui icon input search-decks-div'>
          <input className='search-decks' onChange={this.handleChange}
            type='text'
            placeholder={'Search your Dex by Title or Category'}
            value={this.state.input}/>
          <i className='circular search link icon'></i>
        </div>
        <div className='container'>
          <div className='flex-container'>
            {decks}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { decks: Object.values(state.decks.byId) }
}

export default connect(mapStateToProps)(DeckContainer)
