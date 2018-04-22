import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Dropdown, Loader, Menu, Container, Header, Form } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileAdmin from '/imports/ui/components/ProfileAdmin';
import { Bert } from 'meteor/themeteorchef:bert';
import { NavLink, withRouter } from 'react-router-dom';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileListViewAdmin extends React.Component {

  constructor(props) {
    super(props);
    const allUsers = this.props.users.map(user => ({
      key: user._id,
      text: user.owner,
      value: user.owner,
      image: { avatar: true, src: user.image },
    }));
    this.state = {
      emailExists: false,
      email: '',
      userProfile: {
        userName: this.props.profile.userName,
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        image: this.props.profile.image,
        restrictions: this.props.profile.restrictions,
        owner: this.props.profile.owner,
        id: this.props.profile.owner,
      },
      allUsers: allUsers,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, { name, value }) {
      this.setState({ [name]: value });
  }

  handleSubmit(e, { name }) {
    let email = '';
    if (name === 'dropdown') {
      email = this.state.profileView;
    } else {
      email = this.state.email;
    }
    const userProfile = this.props.users.find(function (element) {
      return element.owner === email;
    });
    if (userProfile !== undefined) {
      if (userProfile.owner !== this.state.userProfile.owner) {
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
        Bert.alert({ type: 'danger', message: 'you are already at that email' });
      }
    } else {
      Bert.alert({ type: 'danger', message: 'That email does not exist' });
    }
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          {/* dropdown for profiles */}
          <Menu>
            {/* dropdown for profiles */}
            <Menu.Item>
              <Form name="dropdown" onSubmit={this.handleSubmit}>
                <Form.Select name="profileView"
                             label="Search with dropdown"
                             placehold='users'
                             options={this.state.allUsers}
                             onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Form>
            </Menu.Item>
            {/* search for profiles */}
            <Menu.Item>
              <Form name="search" onSubmit={this.handleSubmit}>
                <Form.Input label="Search with email"
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
          {/* display card for profile */}
          <ProfileAdmin key={this.state.userProfile._id} user={this.state.userProfile} />;
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileListViewAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UsersAdmin');
  const documentId = match.params._id;
  if (Users.findOne(documentId) === undefined) {
    return {
      profile: {
        userName: 'none',
        firstName: 'none',
        lastName: 'none',
        image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
        restrictions: 'none',
        owner: 'no profile selected',
      },
      users: Users.find({}).fetch(),
      ready: subscription.ready(),
    };
  }
    return {
      profile: Users.findOne(documentId),
      users: Users.find({}).fetch(),
      ready: subscription.ready(),
    };
})(ProfileListViewAdmin);

