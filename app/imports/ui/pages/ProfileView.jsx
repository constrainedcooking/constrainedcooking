import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Table, Header, Loader, Card, Container } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Profile from '/imports/ui/components/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileView extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
         <div>
          {this.props.user.map((user) => <Profile key={user._id} user={user} />)}
         </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileView.propTypes = {
  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    user: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ProfileView);

