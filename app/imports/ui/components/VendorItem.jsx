import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
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
    const availableStyle = { color: 'blue' };
    const notavailableStyle = { color: 'red' };
    return (
        <Table.Row>
          <Table.Cell>{this.props.vendor.name}</Table.Cell>
          <Table.Cell>{this.props.vendor.price}</Table.Cell>
          {this.props.vendor.available === true ? (
              <Table.Cell style={availableStyle}>Available</Table.Cell>
          ) : (
              <Table.Cell style={notavailableStyle}>Not Available</Table.Cell>
          )}
          {this.props.showvendor === true ? (
              <Table.Cell>
                <Button animated onClick = {this.onClick} color='green'>
                  <Button.Content visible>{this.props.vendor.vendorname}</Button.Content>
                  <Button.Content hidden>
                    <Icon name='right arrow' />
                  </Button.Content>
                </Button>
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
