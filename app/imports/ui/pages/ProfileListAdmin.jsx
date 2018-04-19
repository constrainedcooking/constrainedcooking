import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Dropdown, Loader, Menu, Container } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileItemAdmin from '/imports/ui/components/ProfileItemAdmin';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileListAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      profile: { userName: 'no one selected', firstName: 'N/A', lastName: 'N/A',
        image: 'http://ironchefallstars.com/wp-content/uploads/2017/06/c2-1.jpg',
        restrictions: 'vegan',
        owner: 'N/A' },
    };
  }

  onClick(user) {
    /* eslint-disable-next-line */
      this.setState({profile: { userName: 'no one selected', firstName: 'N/A', lastName: 'N/A',
          image: 'http://ironchefallstars.com/wp-content/uploads/2017/06/c2-1.jpg',
          restrictions: 'vegan',
          owner: 'N/A' } });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    const userProfile = <Card centered>
      <Image size="medium" src={this.state.profile.image } />
      <Card.Content>
        <Card.Header>
          {this.state.profile.userName}
        </Card.Header>
        <Card.Meta>
          {this.state.profile.firstName} {this.state.profile.lastName}
        </Card.Meta>
        <Card.Description>
          Dietary Restrictions: {this.state.profile.restrictions}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        { /* <Link to={`/editprofile/${this.props.user._id}`}>Edit</Link> */ }
      </Card.Content>
    </Card>;
    return (
        <Container>
          <Menu.Item>
            <Dropdown item text='users'>
              <Dropdown.Menu>
                {this.props.user.map((users) =>
                    <Dropdown.Item key={users._id} onClick={this.onClick(users)}>
                      {users.owner}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <div>
            {userProfile}
          </div>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileListAdmin.propTypes = {
  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UsersAdmin');
  return {
    user: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ProfileListAdmin);

