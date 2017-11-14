import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/loginUser.js'
import { bindActionCreators } from 'redux'
import DeckContainer from './DeckContainer'
import { Route, Switch } from 'react-router-dom'
import HomepageCardContainer from './HomepageCardContainer'
import NewDeckForm from './NewDeckForm'
import NewCardForm from './NewCardForm'
import FlashCardsContainer from './FlashCardsContainer'
import PlayCardsContainer from './PlayCardsContainer'
import GameCardsContainer from './GameCardsContainer'
import WrittenCardsContainer from './WrittenCardsContainer'
// import PublicDeckContainer from './PublicDeckContainer'

class Home extends React.Component{

  handleClick = (event) => {
    event.preventDefault()

    this.props.logoutUser()
  }

  render(){
    return(
      <div>
        <button onClick={this.handleClick}> Logout </button>
        Hello, {this.props.username}
        <Switch>
          <Route exact path='/decks/:id/cards/new' component={NewCardForm}/>
          <Route exact path='/decks/:id/flashcards/play' component={PlayCardsContainer}/>
          <Route exact path='/decks/:id/flashcards' component={FlashCardsContainer}/>
          <Route exact path='/decks/:id/write' component={WrittenCardsContainer}/>
          <Route exact path='/decks/:id/match' component={GameCardsContainer}/>
          <Route exact path='/decks/new' component={NewDeckForm}/>
          <Route exact path='/decks/:id' component={HomepageCardContainer}/>
          <Route exacpt path='/decks' component={DeckContainer} />
          {/* <Route exacpt path='/public_decks' component={PublicDeckContainer} /> */}
          <Route exact path='/public_decks/:id/flashcards/play' component={PlayCardsContainer}/>
          <Route exact path='/public_decks/:id/flashcards' component={FlashCardsContainer}/>
          <Route exact path='/public_decks/:id/write' component={WrittenCardsContainer}/>
          <Route exact path='/public_decks/:id/match' component={GameCardsContainer}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ username: state.user.username })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)
