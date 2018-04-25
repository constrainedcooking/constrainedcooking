import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.vendor.name}</Table.Cell>
          <Table.Cell>{this.props.vendor.price}</Table.Cell>
          {this.props.vendor.available === true ? (
              <Table.Cell>Available</Table.Cell>
          ) : (
              <Table.Cell>Not Available</Table.Cell>
          )}
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
