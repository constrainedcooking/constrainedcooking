import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Recipe from '/imports/ui/components/Recipe';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {
  // recipes = [{
  //   name: 'Mug Cake',
  //   description: 'Done in minutes, this mug cake is a quick fix for a sweet craving.  Best eaten warm!',
  //   image: 'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16018_Birthday-Party-Mug-Cake_600x600.jpg?ext=.jpg',
  //   tag: 'vegan',
  // },
  //   {
  //     name: 'Cheesy Cauliflower Gratin',
  //     description: 'A great side dish that mixes cheese and vegetables.  Who needs fondue?',
  //     image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/3/6/0/sh0704_cauliflower.jpg.rend.hgtvcom.616.462.suffix/1371585590768.jpeg',
  //     tag: 'gluten free',
  //   },
  //   {
  //     name: 'Warm Spinach Salad with Eggs and Bacon',
  //     description: 'A savory salad that will keep you full until dinner.',
  //     image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/7/27/0/SH0812_Spinach_Salad.jpg.rend.hgtvcom.616.462.suffix/1371585552045.jpeg',
  //     tag: 'vegetarian',
  //   },
  // ]

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
