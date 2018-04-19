import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Dropdown, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    /* eslint-disable-next-line */
    if (confirm('Do you want to make this person/group a vendor?')) {
      /*
      Meteor.call('addVendor', function (err, res) {
        if (err) {
          console.log(JSON.stringify(err, null, 2));
        } else {
          console.log(res, 'success!');
        }
      });
      */
    }
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
    }
  }
  render() {
    return (
        <option value={this.props.user.owner}>{this.props.user.owner}</option>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);
