import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Login from './components/LoginForm'
import Signup from './components/SignupForm'
import Home from './components/Home'
import './App.css';
import { connect } from 'react-redux'
import { reauthenticateUser } from './actions/loginUser.js'
import { userIsAuthenticated, userIsNotAuthenticated } from './auth'
import MyMenu from './components/MyMenu'
import PublicDeckContainer from './components/PublicDeckContainer'
import { fetchPublicDecks } from './actions/publicDeckActions.js'

class App extends Component {

  componentDidMount () {
    if (localStorage.getItem('token')){
      this.props.reauthenticateUser()
      this.props.fetchPublicDecks()
    }
  }

  render() {
    return (
      <div className="App">
        <MyMenu />
        <Switch>
          <Route path='/decks' component={userIsAuthenticated(Home)}/>
          <Route exact path='/login' component={userIsNotAuthenticated(Login)}/>
          <Route exact path='/signup' component={userIsNotAuthenticated(Signup)}/>
          <Redirect to='/decks'/>
        </Switch>
      </div>
    );
  }
}



export default withRouter(connect(null, { reauthenticateUser, fetchPublicDecks })(App))
