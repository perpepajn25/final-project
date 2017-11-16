import React from 'react'
import PublicDeck from './PublicDeck'
import { connect } from 'react-redux'

class PublicDeckContainer extends React.Component{

  state = {
    input: ''
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render(){
    let filteredDecks = this.props.publicDecks.filter((deck)=>{
      return deck.title.toLowerCase().includes(this.state.input.toLowerCase()) || deck.subject.toLowerCase().includes(this.state.input.toLowerCase())
    })
    let decks = filteredDecks.map((deck)=>{
      return <PublicDeck key={deck.id} {...deck}/>
    })
    return (
      <div>
        <div className='ui icon input search-decks-div'>
          <input className='search-decks' onChange={this.handleChange}
            type='text'
            placeholder={'Search public Dex by Title or Category'}
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
  return { publicDecks: Object.values(state.publicDecks.byId) }
}

export default connect(mapStateToProps)(PublicDeckContainer)
