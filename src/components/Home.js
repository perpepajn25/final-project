import React from 'react'
import DeckContainer from './DeckContainer'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
// import MySidebar from './MySidebar'
import HomepageCardContainer from './HomepageCardContainer'
import NewDeckForm from './NewDeckForm'
import NewCardForm from './NewCardForm'
import FlashCardsContainer from './FlashCardsContainer'
import PlayCardsContainer from './PlayCardsContainer'
import GameCardsContainer from './GameCardsContainer'
import WrittenCardsContainer from './WrittenCardsContainer'
import MySidebar from './MySidebar'
// import PublicDeckContainer from './PublicDeckContainer'

class Home extends React.Component{
  render(){
    return(
      <div>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={1}>
            <Route path='/decks/:id' component={MySidebar} />
          </Grid.Column>
          <Grid.Column width={9} textAlign='center' verticalAlign='middle'>
        <Switch>
          <Route exact path='/decks/:id/cards/new' component={NewCardForm}/>
          <Route exact path='/decks/:id/flashcards/play' component={PlayCardsContainer}/>
          <Route exact path='/decks/:id/flashcards' component={FlashCardsContainer}/>
          <Route exact path='/decks/:id/write' component={WrittenCardsContainer}/>
          <Route exact path='/decks/:id/match' component={GameCardsContainer}/>
          <Route exact path='/decks/new' component={NewDeckForm}/>
          <Route exact path='/decks/:id' component={HomepageCardContainer}/>
          <Route exact path='/decks' component={DeckContainer} />
          {/* <Route exacpt path='/public_decks' component={PublicDeckContainer} /> */}
          <Route exact path='/public_decks/:id/flashcards/play' component={PlayCardsContainer}/>
          <Route exact path='/public_decks/:id/flashcards' component={FlashCardsContainer}/>
          <Route exact path='/public_decks/:id/write' component={WrittenCardsContainer}/>
          <Route exact path='/public_decks/:id/match' component={GameCardsContainer}/>
          <Redirect to='/decks'/>
        </Switch>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
      </div>
    )
  }
}

export default Home
