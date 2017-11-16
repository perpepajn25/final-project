import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ArtLogo from '../images/ArtLogo.png'
import ComputerScienceLogo from '../images/ComputerScienceLogo.png'
import ForeignLangLogo from '../images/ForeignLangLogo.png'
import LangArtsLogo from '../images/LangArtsLogo.png'
import MathLogo from '../images/MathLogo.png'
import OtherLogo from '../images/OtherLogo.png'
import ScienceLogo from '../images/ScienceLogo.png'
import SocialStudiesLogo from '../images/SocialStudiesLogo.png'

class PublicDeck extends React.Component{

  shortenTitle = (title) => {
    if (title.length > 15){
      return `${title.substring(0,15)}...`
    } else {
      return title
    }
  }

  chooseSubjectLogo = (category) => {
    switch (category) {
      case 'Art':
       return ArtLogo

      case 'Science':
        return ScienceLogo

      case 'Language Arts':
        return LangArtsLogo

      case 'Foreign Language':
        return ForeignLangLogo

      case 'Social Studies':
        return SocialStudiesLogo

      case 'Mathematics':
          return MathLogo

      case 'Computer Science':
          return ComputerScienceLogo

      case 'Elective':
          return OtherLogo

      default:
          return OtherLogo
    }
  }

  render(){
    return (
    <div className='deck'>
      <Link to={`/decks/public/${this.props.id}/flashcards`}>
        <div className='deck-inner'>
          <h3>{this.shortenTitle(this.props.title)}</h3>
          <img alt={this.props.subject} className="subject-logos" src={this.chooseSubjectLogo(this.props.subject)} />
          <h4> Card Count: {this.props.cards.length}</h4>
        </div>
      </Link>
    </div>
    )
  }
}

export default withRouter(PublicDeck)
