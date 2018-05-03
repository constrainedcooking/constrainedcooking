import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Users, UserSchema } from '/imports/api/user/user';
import { Vendors } from '/imports/api/vendor/vendor';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';


/** Renders the Page for editing a single document. */
class ProfileEdit extends React.Component {

  // /** On successful submit, insert the data. */
   submit(data) {
     const { userName, firstName, lastName, restrictions, image, _id } = data;
     Users.update(_id, { $set: { userName, firstName, lastName, restrictions, image } }, (error) => (error ?
         Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
         Bert.alert({ type: 'success', message: 'Update succeeded' })));

     if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
       const isVendor = Vendors.find({ owner: Meteor.user().username }).fetch();
       Vendors.update(isVendor[0]._id, { $set: { userName: userName, firstName: firstName, lastName: lastName, image: image } }, (error) => (error ?
           Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
           Bert.alert({ type: 'success', message: 'Update succeeded' })));

     }
   }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    console.log('in render page');
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={UserSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <TextField name='userName' value={this.props.doc.userName}/>
                <TextField name='image'/>
                <SelectField name='restrictions'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ProfileEdit.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  const subscription2 = Meteor.subscribe('Vendor');
  return {
    doc: Users.findOne(documentId),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ProfileEdit);
