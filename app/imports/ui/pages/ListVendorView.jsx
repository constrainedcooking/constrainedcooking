import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Table, Loader, Menu, Container, Header, Form } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import VendorItem from '/imports/ui/components/VendorItem';
import ProfileVendor from '/imports/ui/components/ProfileVendor';
import { Bert } from 'meteor/themeteorchef:bert';
import { NavLink, withRouter } from 'react-router-dom';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListVendorView extends React.Component {

  constructor(props) {
    super(props);
    const allVendors = this.props.users.map(vendor => ({
      key: vendor._id,
      text: vendor.userName,
      value: vendor.userName,
      image: { avatar: true, src: vendor.image },
    }));
    this.state = {
      email: this.props.profile.userName,
      profileView: this.props.profile.userName,
      userProfile: {
        userName: this.props.profile.userName,
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        image: this.props.profile.image,
        items: this.props.profile.items,
        owner: this.props.profile.owner,
        id: this.props.profile.owner,
      },
      size: 'small',
      allVendors: allVendors,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e, { name }) {
    const email = this.state.profileView;
    const userProfile = this.props.users.find(function (element) {
      return element.userName === email;
    });
    if (userProfile !== undefined) {
      if (userProfile.userName !== this.state.userProfile.userName) {
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
        Bert.alert({ type: 'danger', message: 'you are already at that user' });
      }
    } else {
      Bert.alert({ type: 'danger', message: 'That user does not exist' });
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
                             options={this.state.allVendors}
                             onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Form>
            </Menu.Item>
            <Menu.Item>
              <ProfileVendor
                  key={this.state.userProfile._id}
                  user={this.state.userProfile}
                  size={'small'}
                  clickable={false}
              />
            </Menu.Item>
          </Menu>
          {/* display card for profile */}
          <Header as="h2" textAlign="center">Items Available</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.userProfile.items.map((item, index) =>
                  <VendorItem
                      key={index}
                      vendor={item}
                      showvendor={false}
                  />)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListVendorView.propTypes = {
  users: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendor');
  const documentId = match.params._id;
  if (Vendors.findOne(documentId) === undefined) {
    return {
      profile: {
        userName: 'none',
        firstName: 'none',
        lastName: 'none',
        image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
        items: [{ name: 'hotdogs', price: 4.20, available: false }],
        owner: 'no profile selected',
      },
      users: Vendors.find({}).fetch(),
      ready: subscription.ready(),
    };
  }
  return {
    profile: Vendors.findOne(documentId),
    users: Vendors.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListVendorView);

