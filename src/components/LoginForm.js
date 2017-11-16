import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/loginUser.js'
import { fetchPublicDecks } from '../actions/publicDeckActions.js'

class LoginForm extends React.Component{

  state={
    username: '',
    password: ''
  }

  handleChange=(event,key)=>{
    this.setState({
      [key]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.loginUser(this.state, 'login')
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleLogin}>
          <label>Username</label>
          <input type='text' name='username' onChange={(event) => {this.handleChange(event,'username')}}/>
          <label>Password</label>
          <input type='password' name='Password' onChange={(event) => {this.handleChange(event,'password')}}/>
          <button> login </button>
        </form>
        or
        <Link to='/signup'> Sign Up </Link>
      </div>
    )
  }
}

export default connect(null, { loginUser, fetchPublicDecks })(LoginForm)
