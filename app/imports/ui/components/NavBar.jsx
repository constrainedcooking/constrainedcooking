import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted color = 'brown'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <img src = '/images/colandericon.png'/>
        </Menu.Item>
        <Menu.Item>
          <Dropdown item text='Recipes'>
            <Dropdown.Menu>
              <Dropdown.Item as = {NavLink} activeClassName = "" exact to ="/list">Home</Dropdown.Item>
              <Dropdown.Item as = {NavLink} activeClassName = "" exact to ="/addrecipe">Add Recipe</Dropdown.Item>
              <Dropdown.Item>Others</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown item text='Vendors'>
            <Dropdown.Menu>
              <Dropdown.Item as = {NavLink} activeClassName = "" exact to ="/listvendor">Home</Dropdown.Item>
              <Dropdown.Item as = {NavLink} activeClassName = "" exact to ="/addvendoritem">Add Item</Dropdown.Item>
              <Dropdown.Item>Others</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}

      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
