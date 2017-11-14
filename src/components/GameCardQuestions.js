import React from 'react'
import "../App.css"

class GameCardQuestions extends React.Component {

  selectQuestion = () => {
    this.props.onSelectQuestion(this.props.id)
  }

  render(){
    return(
        this.props.solved ? <div className="item"> solved! </div> : <div onClick={this.selectQuestion}> <div> {this.props.question} </div> </div>
    )
  }
}

export default GameCardQuestions
