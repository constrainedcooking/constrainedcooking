import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '/imports/api/user/user';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      username: '',
      firstname: '',
      lastname: '',
      userimage: '',
      restriction: '',
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, username, firstname, lastname, userimage, restriction } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
      }
    });
    Users.insert({
      userName: username, firstName: firstname,
      lastName: lastname, image: userimage,
      restrictions: restriction, owner: email }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
      }
    });
  }

    /** Display the signup form. */
  render() {
      const dietOptions = [
        { key: 1, text: 'vegan', value: 'vegan' },
        { key: 2, text: 'vegetarian', value: 'vegetarian' },
        { key: 3, text: 'kosher', value: 'kosher' },
        { key: 4, text: 'none', value: 'none' },
      ];
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="user name"
                      icon="lock"
                      iconPosition="left"
                      name="username"
                      placeholder="username"
                      type="username"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="first name"
                      icon="lock"
                      iconPosition="left"
                      name="firstname"
                      placeholder="first name"
                      type="firstname"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="last name"
                      icon="lock"
                      iconPosition="left"
                      name="lastname"
                      placeholder="last name"
                      type="lastname"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="userimage"
                      icon="lock"
                      iconPosition="left"
                      name="userimage"
                      placeholder="url of image"
                      type="userimage"
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      label="restriction"
                      icon="lock"
                      iconPosition="left"
                      name="restriction"
                      placeholder="dietary restriction"
                      type="restriction"
                      options={dietOptions}
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
