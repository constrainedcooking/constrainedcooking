import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    /* eslint-disable-next-line */
    if (confirm("Do you want to make this person/group a vendor?")) {
      const account = Accounts.findUserByEmail(this.props.user.owner);
      Roles.addUsersToRoles(account, 'vendor');
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
        <Card centered>
          <Image size="medium" src={this.props.user.image } />
          <Card.Content>
            <Card.Header>
              {this.props.user.userName}
            </Card.Header>
            <Card.Meta>
              {this.props.user.firstName} {this.props.user.lastName}
            </Card.Meta>
            <Card.Description>
              Dietary Restrictions: {this.props.user.restrictions}
            </Card.Description>
          </Card.Content>
           <Card.Content extra>
             <Button basic onClick = {this.onClick}>Set as Vendor</Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);
