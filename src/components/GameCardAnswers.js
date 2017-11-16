import React from 'react'
import "../App.css"

class GameCardAnswers extends React.Component {

  selectAnswer = () => {
    this.props.onSelectAnswer(this.props.id)
  }

  render(){
    return(
        this.props.solved ? <div className="blank-div"> </div> : <div className='game-card' onClick={this.selectAnswer} style={this.props.selected ? {border: 'solid orange'} : null}> <div> {this.props.answer} </div> </div>
    )
  }
}

export default GameCardAnswers
