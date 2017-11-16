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
        <div className='flip-card' onClick={this.handleFlip}>
         {this.state.clicked ?  <div className='flip-card-content'> <h5>A.</h5> {this.props.answer}</div> : <div className='flip-card-content'> <h5>Q.</h5>  {this.props.question}</div>}
       </div>
  )
  }
}

export default FlipCard
