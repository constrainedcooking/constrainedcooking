import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Dropdown, Loader, Menu, Container, Form } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { NavLink, Redirect } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileListAdmin extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      emailExists: false,
      email: '',
      userProfile: {
        userName: 'none',
        firstName: 'none',
        lastName: 'none',
        image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
        restrictions: 'none',
        owner: 'none',
        id: 'none',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const email = this.state.email;
    const userProfile = this.props.users.find(function (element) {
      return element.owner === email;
    });
    if (userProfile !== undefined) {
        this.setState({ emailExists: true });
        this.setState({
          userProfile: {
            userName: userProfile.userName,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            image: userProfile.image,
            restrictions: userProfile.restrictions,
            owner: userProfile.owner,
            _id: userProfile._id,
          },
        });
    } else {
      Bert.alert({ type: 'danger', message: 'That email does not exist' });
    }
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.state.emailExists) {
      return <Redirect to={`/profileviewadmin/${this.state.userProfile._id}`}/>;
    }
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
              <Form onSubmit={this.handleSubmit}>
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

