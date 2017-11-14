import React from 'react'
import "../App.css"

class GameCardAnswers extends React.Component {

  selectAnswer = () => {
    this.props.onSelectAnswer(this.props.id)
  }

  render(){
    return(
        this.props.solved ? <div className="item"> solved! </div> : <div> <div onClick={this.selectAnswer}> {this.props.answer} </div> </div>
    )
  }
}

export default GameCardAnswers
