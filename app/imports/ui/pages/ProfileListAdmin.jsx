import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Dropdown, Loader, Menu, Container, Form } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SubmitField from 'uniforms-semantic/SubmitField';
import ProfileItemAdmin from '/imports/ui/components/ProfileItemAdmin';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileListAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', emailExists: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Menu>
            {/* dropdown for profiles */}
            <Menu.Item>
              <Dropdown item text='users'>
                <Dropdown.Menu>
                  {this.props.users.map((user) =>
                      <Dropdown.Item
                          key={user._id} as = {NavLink}
                          activeClassName = ""
                          exact to ={`/profileviewadmin/${user._id}`}>
                        {user.owner}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            {/* search for profiles */}
            <Menu.Item>
              <Form>
                <Form.Input label="Email"
                            icon="user"
                            iconPosition="left"
                            name="email"
                            type="email"
                            placeholder="E-mail address"
                            onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Form>
            </Menu.Item>
          </Menu>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileListAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UsersAdmin');
  return {
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ProfileListAdmin);

