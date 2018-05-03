import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Loader, Container, Header } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import VendorItem from '/imports/ui/components/VendorItem';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListVendorAll_Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 'small',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
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
    let allItems = this.props.users.map((vendor) => vendor.items);
    allItems = allItems.flatten();
    allItems = _.sortBy(allItems, 'name');
    const vendorHeader = { background: 'green', color: 'whitesmoke' };
    const availHeader = { background: 'turquoise', color: 'whitesmoke' };
    const priceHeader = { background: 'silver', color: 'whitesmoke' };
    const nameHeader = { background: 'orange', color: 'whitesmoke' };
    return (
        <Container>
          <Header as="h2" textAlign="center">Items Available</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style ={nameHeader} textAlign='center'>Name</Table.HeaderCell>
                <Table.HeaderCell style ={priceHeader} textAlign='center'>Price (U.S Dollars)</Table.HeaderCell>
                <Table.HeaderCell style ={availHeader} textAlign='center'>Availability</Table.HeaderCell>
                <Table.HeaderCell style={vendorHeader} textAlign='center'>Vendor</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {allItems.map((item, index) =>
                  <VendorItem
                      key={index}
                      vendor={item}
                      showvendor={true}
                />)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListVendorAll_Items.propTypes = {
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
})(ListVendorAll_Items);

