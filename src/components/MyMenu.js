import React from 'react'
import { Menu, Segment, Button, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DexLogo from '../images/DexLogo.png'
import { logoutUser } from '../actions/loginUser.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MyMenu extends React.Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = (event) => {
    event.preventDefault()

    this.props.logoutUser()
  }


  render() {
    const { activeItem } = this.state

    return (
    this.props.username ?
    <Segment className="ui navbar" inverted >
      <Grid>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={1}>
          <div className="menu-logo-parent">
            <Image src={DexLogo}/>
          </div>
        </Grid.Column>
        <Grid.Column width={9}>
          <Menu inverted secondary>
              <Menu.Item as={Link} to='/decks' className="menu-item" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
              <Menu.Item as={Link} to='/decks/new' className="menu-item" name='create deck' active={activeItem === 'create deck'} onClick={this.handleItemClick}/>
              <Menu.Item as={Link} to='/public_decks' name='search public decks' active={activeItem === 'search public decks'} onClick={this.handleItemClick}/>
            <Menu.Menu position='right'>
              <Menu.Item> Hello, {this.props.username}!</Menu.Item>
              <Menu.Item>
                <Button className="ui logout" onClick={this.handleLogout}>Logout</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    </Segment> :
      null
    )
  }
}
const mapStateToProps = (state) => ({ username: state.user.username })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(MyMenu)
