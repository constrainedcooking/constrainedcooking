import React from 'react';
import { Grid, Loader, Header, Form, Button } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/** Renders the Page for editing a single document. */
class EditVendorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.itemName,
      price: this.props.itemPrice,
      availability: this.props.itemAvail,
      formerpage: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /** On successful submit, insert the data. */
  handleSubmit() {
    this.setState({ formerpage: true });
    let available = true;
    if (this.state.availability === 'false') {
      available = false;
    } else {
      available = true;
    }
    const owner = Meteor.user().username;
    Vendors.update(
        this.props.vendorAccount[0]._id,
        { $pull: { items: { name: this.props.itemName } } }, (error) => (error ?
            Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Update succeeded' })),
    );
    const items = {
      name: this.state.item,
      price: this.state.price,
      available: available,
      vendor: owner,
      vendorname: this.props.vendorAccount[0].userName,
    };
    Vendors.update(
        this.props.vendorAccount[0]._id,
        { $push: { items: items } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })),
    );
   /* Vendors.update(
        { _id: this.props.vendorAccount[0]._id, 'items.name': this.props.itemName },
        { $set: { 'items.$.name': name, 'items.$.price': price, 'items.$.available': available } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })),
    ); */
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  onClick() {
    this.setState({ formerpage: true });
    Vendors.update(
        this.props.vendorAccount[0]._id,
        { $pull: { items: { name: this.props.itemName } } }, (error) => (error ?
            Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Delete succeeded' })),
      );
    }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.formerpage === true) {
        return <Redirect to={'/addvendoritem'}/>;
    }
    const availableOptions = [
      { key: 1, text: 'available', value: 'true' },
      { key: 2, text: 'not available', value: 'false' },
    ];
    return (
        <Grid container centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Item</Header>
            <Form ref={(ref) => { this.formRef = ref; }} onSubmit={this.handleSubmit}>
              <Form.Input name="item"
                          lable="item"
                          placeholder="item"
                          defaultValue={this.props.itemName}
                          onChange={this.handleChange}
              />
              <Form.Input name="price"
                          lable="price"
                          placeholder="price"
                          defaultValue={this.props.itemPrice}
                          onChange={this.handleChange}
              />
              <Form.Select name="availability"
                           options={availableOptions}
                           label="availability"
                           placehold='users'
                           onChange={this.handleChange}
              />
              <Form.Button content="Update item"/>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" textAlign="center">Delete Item</Header>
            <Button onClick = {this.onClick} color='red' size='huge'>delete item</Button>
          </Grid.Column>
        </Grid>
    );
  }
}

EditVendorItem.propTypes = {
  vendorAccount: PropTypes.array.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.string.isRequired,
  itemAvail: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendor');
  const documentId = match.params._id;
  console.log('fuck', documentId);
  const vendorFields = documentId.split('_');
  return {
    vendorAccount: Vendors.find({ owner: Meteor.user().username }).fetch(),
    itemName: vendorFields[0],
    itemPrice: vendorFields[1],
    itemAvail: vendorFields[2],
    ready: subscription.ready(),
  };
})(EditVendorItem);
