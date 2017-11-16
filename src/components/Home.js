import React from 'react'
import DeckContainer from './DeckContainer'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import PublicSidebar from './PublicSideBar'
import HomepageCardContainer from './HomepageCardContainer'
import NewDeckForm from './NewDeckForm'
import NewCardForm from './NewCardForm'
import FlashCardsContainer from './FlashCardsContainer'
import PlayCardsContainer from './PlayCardsContainer'
import GameCardsContainer from './GameCardsContainer'
import WrittenCardsContainer from './WrittenCardsContainer'
import MySidebar from './MySidebar'
import PublicDeckContainer from './PublicDeckContainer'
import PublicFlashCardsContainer from './PublicFlashCardsContainer'
import PublicWrittenCardsContainer from './PublicWrittenCardsContainer'
import PublicPlayCardsContainer from './PublicPlayCardsContainer'
import PublicGameCardsContainer from './PublicGameCardsContainer'
import { fetchPublicDecks } from '../actions/publicDeckActions.js'
import { connect } from 'react-redux'

class Home extends React.Component{

  componentDidMount(){
    if (localStorage.getItem('token')){
      this.props.fetchPublicDecks()
    }
  }

  render(){
    return(
      <div>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={1}>
            <Route path='/decks/public/:id' component={PublicSidebar} />
            <Route path='/decks/:id' component={MySidebar} />
          </Grid.Column>
          <Grid.Column width={9} textAlign='center' verticalAlign='middle'>
        <Switch>
          <Route exact path='/decks/public/:id/flashcards/play' component={PublicPlayCardsContainer}/>
          <Route exact path='/decks/public/:id/flashcards' component={PublicFlashCardsContainer}/>
          <Route exact path='/decks/public/:id/write' component={PublicWrittenCardsContainer}/>
          <Route exact path='/decks/public/:id/match' component={PublicGameCardsContainer}/>
          <Route exact path='/decks/:id/cards/new' component={NewCardForm}/>
          <Route exact path='/decks/:id/flashcards/play' component={PlayCardsContainer}/>
          <Route exact path='/decks/:id/flashcards' component={FlashCardsContainer}/>
          <Route exact path='/decks/:id/write' component={WrittenCardsContainer}/>
          <Route exact path='/decks/:id/match' component={GameCardsContainer}/>
          <Route exacpt path='/decks/public' component={PublicDeckContainer} />
          <Route exact path='/decks/new' component={NewDeckForm}/>
          <Route exact path='/decks' component={DeckContainer} />
          <Route exact path='/decks/:id' component={HomepageCardContainer}/>
          <Redirect to='/decks'/>
        </Switch>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
      </div>
    )
  }
}

export default connect(null, { fetchPublicDecks }) (Home)
