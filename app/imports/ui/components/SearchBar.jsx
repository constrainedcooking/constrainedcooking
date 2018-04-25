import _ from 'lodash';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Search, Grid, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Recipes } from '/imports/api/recipe/recipe';

const defaultRecipes = [
  {
    name: 'Mug Cake',
    description: 'Done in minutes, this mug cake is a quick fix for a sweet craving.  Best eaten warm!',
    time: 15,
    servings: 1,
    image: 'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16018_Birthday-Party-Mug-Cake_600x600.jpg?ext=.jpg',
    ingredients: [''],
    directions: [''],
    tags: ['vegan', 'vegetarian'],
    creator: 'landolakes',
  },
  {
    name: 'Cheesy Cauliflower Gratin',
    description: 'A great side dish that mixes cheese and vegetables.  Who needs fondue?',
    time: 30,
    servings: 3,
    image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/3/6/0/sh0704_cauliflower.jpg.rend.hgtvcom.616.462.suffix/1371585590768.jpeg',
    ingredients: [''],
    directions: [''],
    tags: ['cheese'],
    creator: 'food.fnr.sndimg',
  },
  {
    name: 'Warm Spinach Salad with Eggs and Bacon',
    description: 'A savory salad that will keep you full until dinner.',
    time: 25,
    servings: 2,
    image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/7/27/0/SH0812_Spinach_Salad.jpg.rend.hgtvcom.616.462.suffix/1371585552045.jpeg',
    ingredients: [''],
    directions: [''],
    tags: ['vegetarian'],
    creator: 'food.fnr.sndimg',
  },
  {
    name: 'Brownie In a Mug',
    description: 'A quick brownie made in a microwave,',
    time: 5,
    servings: 1,
    image: 'https://du7ybees82p4m.cloudfront.net/55fd8b32cce872.08810499.jpg?width=910&height=512',
    ingredients: [{ name: 'small egg', amount: '1' }, { name: 'light brown sugar', amount: '65g' }, { name: 'plain flour', amount: '25g' }, { name: 'dark chocolate', amount: '50g' }, { name: 'salted butter', amount: '35g' }, { name: 'pecans', amount: '1 handful' }, { name: 'cocoa powder', amount: '10g' }],
    directions: ['Snap the chocolate into a small bowl and spoon in the sugar and butter. Melt in a microwave for 45 seconds, then stir to continue the melting in the residual heat.', 'Crack in the egg and beat together, followed by the flour and cocoa.', 'Cook for 2 mins on full power (800 watts), then leave to rest for another 2 minutes.', 'Chop the nuts and add to the mixture.', 'Decorate with a dusting of icing sugar, a sprig of mint and a dollop of ice cream! Tuck in!'],
    tags: ['dessert'],
    creator: 'SORTEDfood',
  },
];

class SearchBar extends React.Component {

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(defaultRecipes, isMatch),
      });
    }, 300);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    const { isLoading, value, results } = this.state;
    return (
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
    );
  }
}


export default SearchBar;
