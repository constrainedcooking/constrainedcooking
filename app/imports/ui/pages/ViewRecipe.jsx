import React from 'react';
import { Container, Loader, Header, Image, List } from 'semantic-ui-react';
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
        <Header as="h1">{this.props.recipe.name}</Header>
          <div>
            <Image src={this.props.recipe.image}/>
            <Header as='h3'>Ingredients</Header>
            <List>
              {this.props.recipe.ingredients.map((ingredient, idx) =>(
                  <List.Item key={idx} >{ingredient['amount']}  {ingredient['name']}</List.Item>  //add ingredient vendor cross-ref here
              ))}
            </List>
          </div>
          <div>
            <Header as='h3'>Directions</Header>
            {this.props.recipe.directions.map((step, idx) => (
                <p>{idx + 1}){step}</p>
            ))}
          </div>
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


