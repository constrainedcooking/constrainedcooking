import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Card, Loader, Menu, Container, Form } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import ProfileVendor from '/imports/ui/components/ProfileVendor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Redirect } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListVendor extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      userExists: false,
      profileView: '',
      userProfile: {
        userName: 'greg_house',
        firstName: 'greg',
        lastName: 'house',
        image: 'http://ironchefallstars.com/wp-content/uploads/2017/06/c2-1.jpg',
        owner: 'john@foo.com',
        items: [{ name: 'eggs', price: 2.50, available: true }],
        id: 'none',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e, { name }) {
    const userName = this.state.profileView;
    const userProfile = this.props.users.find(function (element) {
      return element.userName === userName;
    });
    if (userProfile !== undefined) {
      this.setState({ userExists: true });
      this.setState({
        userProfile: {
          userName: userProfile.userName,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          image: userProfile.image,
          items: userProfile.items,
          owner: userProfile.owner,
          _id: userProfile._id,
        },
      });
    } else {
      Bert.alert({ type: 'danger', message: 'That user does not exist' });
    }
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.state.userExists) {
      return <Redirect to={`/vendorview/${this.state.userProfile._id}`}/>;
    }
    const allUsers = this.props.users.map(user => ({
      key: user._id,
      text: user.userName,
      value: user.userName,
      image: { avatar: true, src: user.image },
    }));
    return (
        <Container>
          <Menu>
            {/* dropdown for profiles */}
            <Menu.Item>
              <Form name="dropdown" onSubmit={this.handleSubmit}>
                <Form.Select name="profileView"
                             label="Search with dropdown"
                             placehold='Vendor'
                             options={allUsers}
                             onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Form>
            </Menu.Item>
          </Menu>
          <Header inverted as="h2" textAlign="center">Vendor List</Header>
          <Card.Group>
            {this.props.users.map((vendor, index) =>
                <ProfileVendor
                    key={index}
                    user={vendor}
                    size={'small'}
                    clickable={true}
                />)
            }
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListVendor.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendor');
  return {
    users: Vendors.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListVendor);

