import React from 'react'
import "../App.css"

class GameCardQuestions extends React.Component {

  selectQuestion = () => {
    this.props.onSelectQuestion(this.props.id)
  }

  render(){
    return(
        this.props.solved ? <div className="blank-div"> </div> : <div className='game-card' onClick={this.selectQuestion} style={this.props.selected ? {border: 'solid orange'} : null}> <div> {this.props.question} </div> </div>
    )
  }
}

export default GameCardQuestions
