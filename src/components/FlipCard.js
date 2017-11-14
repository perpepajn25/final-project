import React from 'react'
// import { Link } from 'react-router-dom'

class FlipCard extends React.Component{
  state = {
    clicked: false
  }

  handleFlip = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }


  render () {
    return (
      <div>
        <div onClick={this.handleFlip}>
         {this.state.clicked ? <div> {this.props.answer} </div> : <div> {this.props.question} </div> }
       </div>
    </div>
  )
  }
}

export default FlipCard
