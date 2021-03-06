import React from 'react';
import { Container, Loader, Header, Image, List, Grid } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class ViewRecipe extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as="h1" centered>{this.props.recipe.name}</Header>
                <Header as='h3'>Ingredients</Header>
                <List celled>
                  {this.props.recipe.ingredients.map((ingredient, idx) => (
                      <List.Item key={idx}>{ingredient['amount']} {ingredient['name']}</List.Item>  //add ingredient vendor cross-ref here
                  ))}
                </List>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Grid.Row>
                  <br></br>
                  <br></br>
                  <br></br>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h3'>Ready In</Header>
                  {this.props.recipe.time} minutes
                </Grid.Row>
                <Grid.Row>
                  <br></br>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h3'>Number of Servings</Header>
                  {this.props.recipe.servings}
                </Grid.Row>
              </Grid.Column>

              <Grid.Column>
                <Image src={this.props.recipe.image} size="medium" circular/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Header as='h2'>Directions</Header>
            </Grid.Row>
            <Grid.Row>
              {this.props.recipe.directions.map((step, idx) => (
                  <p>{idx + 1}) { step}</p>
              ))}
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ViewRecipe.propTypes = {
  recipe: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Recipe');
  return {
    recipe: Recipes.findOne(documentId),
    ready: subscription.ready(),
  };
})(ViewRecipe);
