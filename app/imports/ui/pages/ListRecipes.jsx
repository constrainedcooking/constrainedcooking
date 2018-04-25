import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card, Search, Grid } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Recipe from '/imports/ui/components/Recipe';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Home</Header>
          <Card.Group>
            {this.props.recipes.map((recipe, index) => <Recipe key = {index} recipe= {recipe}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Recipe');
  return {
    recipes: Recipes.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListRecipes);
