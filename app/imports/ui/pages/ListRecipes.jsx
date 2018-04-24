import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card, Search, Grid } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Recipe from '/imports/ui/components/Recipe';

const defaultRecipes = [
  {
    name: 'Mug Cake',
    description: 'Done in minutes, this mug cake is a quick fix for a sweet craving.  Best eaten warm!',
    image: 'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16018_Birthday-Party-Mug-Cake_600x600.jpg?ext=.jpg',
    ingredients: [''],
    tag: 'vegan',
    creator: 'landolakes',
  },
  {
    name: 'Cheesy Cauliflower Gratin',
    description: 'A great side dish that mixes cheese and vegetables.  Who needs fondue?',
    image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/3/6/0/sh0704_cauliflower.jpg.rend.hgtvcom.616.462.suffix/1371585590768.jpeg',
    ingredients: [''],
    tag: 'gluten free',
    creator: 'food.fnr.sndimg',
  },
  {
    name: 'Warm Spinach Salad with Eggs and Bacon',
    description: 'A savory salad that will keep you full until dinner.',
    image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/7/27/0/SH0812_Spinach_Salad.jpg.rend.hgtvcom.616.462.suffix/1371585552045.jpeg',
    ingredients: [''],
    tag: 'vegetarian',
    creator: 'food.fnr.sndimg',
  },
  {
    name: 'Brownie In a Mug',
    description: 'A quick brownie made in a microwave,',
    image: 'https://du7ybees82p4m.cloudfront.net/55fd8b32cce872.08810499.jpg?width=910&height=512',
    ingredients: [{ name: 'small egg', amount: '1' }, { name: 'light brown sugar', amount: '65g' }, { name: 'plain flour', amount: '25g' }, { name: 'dark chocolate', amount: '50g' }, { name: 'salted butter', amount: '35g' }, { name: 'pecans', amount: '1 handful' }, { name: 'cocoa powder', amount: '10g' }],
    equipment: [{ name: 'microwave' }, { name: 'mug' }],
    directions: [{ step: 'Snap the chocolate into a small bowl and spoon in the sugar and butter. Melt in a microwave for 45 seconds, then stir to continue the melting in the residual heat.' }, { step: 'Crack in the egg and beat together, followed by the flour and cocoa.' }, { step: 'Cook for 2 mins on full power (800 watts), then leave to rest for another 2 minutes.' }, { step: 'Chop the nuts and add to the mixture.' }, { step: 'Decorate with a dusting of icing sugar, a sprig of mint and a dollop of ice cream! Tuck in!' }],
    tag: 'dessert',
    creator: 'SORTEDfood',
  },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(defaultRecipes, isMatch),
      });
    }, 300);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { isLoading, value, results } = this.state;
    return (
        <Container>
          <Grid>
            <Grid.Column width={8}>
              <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  results={results}
                  value={value}
                  {...this.props}
              />
            </Grid.Column>
          </Grid>
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
