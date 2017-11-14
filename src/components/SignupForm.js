import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/loginUser.js'

class SignupForm extends React.Component{

  state={
    username: '',
    email: '',
    password: ''
  }

  handleChange=(event,key)=>{
    this.setState({
      [key]: event.target.value
    })
  }

  handleSignup = (event) => {
    event.preventDefault()
    this.props.loginUser(this.state, 'signup')
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSignup}>
          <label>Username</label>
          <input type='text' name='username' onChange={(event) => {this.handleChange(event,'username')}}/>
          <label>Email</label>
          <input type='text' name='email' onChange={(event) => {this.handleChange(event,'email')}}/>
          <label>Password</label>
          <input type='password' name='Password' onChange={(event) => {this.handleChange(event,'password')}}/>
          <button> Sign Up </button>
        </form>
      </div>
    )
  }
}

export default connect(null, { loginUser })(SignupForm)
