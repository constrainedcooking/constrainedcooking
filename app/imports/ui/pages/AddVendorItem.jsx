import React from 'react';
import { Vendors } from '/imports/api/vendor/vendor';
import { Grid, Header, Form, Container, Table, Loader } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import VendorItemEdit from '/imports/ui/components/VendorItemEdit';


/** Renders the Page for adding a document. */
class AddVendorItem extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      price: '',
    };
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
    }
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  /** On submit, insert the data. */
  handleSubmit() {
    if (this.state.item !== '' && this.state.price !== '') {
      const itemValue = this.state.item;
      let allItems = this.props.vendoraccount[0].items;
      allItems = allItems.flatten();
      if (allItems.some(function (name) { return name.name === itemValue; }) === false) {
        const owner = Meteor.user().username;
        const available = true;
        const items = {
          name: this.state.item,
          price: this.state.price,
          available: available,
          vendor: owner,
          vendorname: this.props.vendoraccount[0].userName,
        };
        Vendors.update(
            this.props.vendoraccount[0]._id,
            { $push: { items: items } },
            this.insertCallback,
        );
      } else {
        Bert.alert({ type: 'danger', message: 'That item already exists, please edit it instead or change the name' });
      }
    }
  }
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  renderPage() {
    let allItems = this.props.vendoraccount[0].items;
    allItems = allItems.flatten();
    allItems = _.sortBy(allItems, 'name');
    const editHeader = { background: 'green', color: 'whitesmoke' };
    const availHeader = { background: 'turquoise', color: 'whitesmoke' };
    const priceHeader = { background: 'silver', color: 'whitesmoke' };
    const nameHeader = { background: 'orange', color: 'whitesmoke' };
    return (
        <Container>
          <Grid container centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Vendor Item</Header>
              <Form ref={(ref) => { this.formRef = ref; }} onSubmit={this.handleSubmit}>
                <Form.Input name="item"
                            lable="item"
                            placeholder="item"
                            onChange={this.handleChange}
                />
                <Form.Input name="price"
                            lable="price"
                            placeholder="price"
                            onChange={this.handleChange}
                />
                <Form.Button content="Add Item"/>
              </Form>
            </Grid.Column>
          </Grid>
          <Header as="h2" textAlign="center">Your items</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style ={nameHeader} textAlign='center'>Name</Table.HeaderCell>
                <Table.HeaderCell style ={priceHeader} textAlign='center'>Price (U.S Dollars)</Table.HeaderCell>
                <Table.HeaderCell style ={availHeader} textAlign='center'>Availability</Table.HeaderCell>
                <Table.HeaderCell style ={editHeader} textAlign='center'>Update Item</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {allItems.map((item, index) =>
                  <VendorItemEdit
                      key={index}
                      vendor={item}
                  />)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AddVendorItem.propTypes = {
  vendoraccount: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendor');
  return {
    vendoraccount: Vendors.find({ owner: Meteor.user().username }).fetch(),
    ready: subscription.ready(),
  };
})(AddVendorItem);

