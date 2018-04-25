import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileVendor extends React.Component {
  render() {
    return (
        <Card centered size={this.props.size}>
          <Header>{this.props.user.userName}
          </Header>
          <Image size={this.props.size} src={this.props.user.image } />
          <Card.Content>
            <Card.Header>
              {this.props.user.userName}
            </Card.Header>
            <Card.Meta>
              {this.props.user.firstName} {this.props.user.lastName}
            </Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileVendor.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileVendor);
