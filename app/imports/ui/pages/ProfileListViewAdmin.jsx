import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Dropdown, Loader, Menu, Container, Header, Form } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SubmitField from 'uniforms-semantic/SubmitField';
import ProfileItemAdmin from '/imports/ui/components/ProfileItemAdmin';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileListViewAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', emailExists: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email } = this.state;
    if (Users.find({ owner: email }).fetch() === '') {
      this.setState({ emailExists: true });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }
  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          {/* dropdown for profiles */}
          <Menu>
            <Menu.Item>
              <Dropdown item text='users'>
                <Dropdown.Menu>
                  {this.props.users.map((user) =>
                      <Dropdown.Item
                          key={user._id} as = {NavLink}
                          activeClassName = ""
                          exact to ={`/profileviewadmin/${user._id}`}>
                        {user.owner}</Dropdown.Item>)}
                </Dropdown.Menu>
             </Dropdown>
           </Menu.Item>
            {/* search for profiles */}
            <Menu.Item>
              <Form>
                <Form.Input label="Email"
                            icon="user"
                            iconPosition="left"
                            name="email"
                            type="email"
                            placeholder="E-mail address"
                            onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Form>
            </Menu.Item>
          </Menu>
          {/* display card for profile */}
          <Card centered>
            <Header>{this.props.profile.owner}</Header>
            <Image size="medium" src={this.props.profile.image } />
            <Card.Content>
              <Card.Header>
                {this.props.profile.userName}
              </Card.Header>
              <Card.Meta>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </Card.Meta>
              <Card.Description>
                Dietary Restrictions: {this.props.profile.restrictions}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              { /* <Link to={`/editprofile/${this.props.user._id}`}>Edit</Link> */ }
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileListViewAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UsersAdmin');
  const documentId = match.params._id;
  if (Users.findOne(documentId) === '') {
    return {
      profile: {
        userName: 'none',
        firstName: 'none',
        lastName: 'none',
        image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
        restrictions: 'none',
        owner: 'none',
      },
      users: Users.find({}).fetch(),
      ready: subscription.ready(),
    };
  }
    return {
      profile: Users.findOne(documentId),
      users: Users.find({}).fetch(),
      ready: subscription.ready(),
    };
})(ProfileListViewAdmin);

