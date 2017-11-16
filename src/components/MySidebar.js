import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class MySidebar extends React.Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const { id } = this.props.match.params
    if (id === "new") {
      /// typeof
      return null
    } else {
      return (
        <Menu className='my-sidebar' inverted vertical>
          <Menu.Item as={Link} to={`/decks/${id}`} name='deck' active={activeItem === 'deck'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={`/decks/${id}/flashcards`} name='flashcards' active={activeItem === 'flashcards'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={`/decks/${id}/write`} name='written quiz' active={activeItem === 'written quiz'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={`/decks/${id}/match`} name='match game' active={activeItem === 'match game'} onClick={this.handleItemClick} />
        </Menu>
      )
    }

  }
}


export default withRouter(MySidebar)
