import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { withRouter, Redirect } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitVendor: false,
      _id: '',
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const userProfile = Vendors.find({ owner: this.props.vendor.vendor }).fetch();
    // console.log('vendoritem', userProfile);
    if (userProfile[0] !== undefined) {
      this.setState({ visitVendor: true });
      this.setState({ _id: userProfile[0]._id });
    } else {
      Bert.alert({ type: 'danger', message: 'That user does not exist' });
    }
  }
  render() {
    if (this.state.visitVendor === true) {
      return <Redirect to={`/vendorview/${this.state._id}`}/>;
    }
    return (
        <Table.Row>
          <Table.Cell>{this.props.vendor.name}</Table.Cell>
          <Table.Cell>{this.props.vendor.price}</Table.Cell>
          {this.props.vendor.available === true ? (
              <Table.Cell>Available</Table.Cell>
          ) : (
              <Table.Cell>Not Available</Table.Cell>
          )}
          {this.props.showvendor === true ? (
              <Table.Cell>
                <Button basic onClick = {this.onClick} >{this.props.vendor.vendorname}</Button>
              </Table.Cell>
          ) : ''
          }
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
VendorItem.propTypes = {
  vendor: PropTypes.object.isRequired,
  showvendor: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VendorItem);
