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
      itemname: '',
      price: '',
      available: '',
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
      this.setState({ visitVendor: true });
      this.setState({ itemname: this.props.vendor.name });
      this.setState({ price: this.props.vendor.price });
      if (this.props.vendor.available) {
        this.setState({ available: 'true' });
      } else {
        this.setState({ available: 'false' });
      }
    }
  render() {
    if (this.state.visitVendor === true) {
      return <Redirect to={`/vendoredit/${this.state.itemname}_${this.state.price}_${this.state.available}`}/>;
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
              <Table.Cell>
                <Button basic onClick = {this.onClick} >Edit</Button>
              </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
VendorItem.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VendorItem);
