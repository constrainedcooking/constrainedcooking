import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Grid, Header } from 'semantic-ui-react';

const source = [
  {
    title: 'Walsh LLC',
    description: 'Implemented foreground customer loyalty',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dmackerman/128.jpg',
    price: '$28.05',
  },
  {
    title: 'Tremblay, Fisher and Crist',
    description: 'Multi-tiered content-based hardware',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/olgary/128.jpg',
    price: '$68.62',
  },
  {
    title: 'McCullough Group',
    description: 'Exclusive system-worthy emulation',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg',
    price: '$71.72',
  },
  {
    title: 'Romaguera, Kris and Collier',
    description: 'Re-engineered directional definition',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/the_purplebunny/128.jpg',
    price: '$67.15',
  },
  {
    title: 'Fisher Group',
    description: 'Reverse-engineered composite attitude',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/shesgared/128.jpg',
    price: '$13.00',
  },
];

export default class SearchBar extends Component {
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
        results: _.filter(source, isMatch),
      });
    }, 300);
  }

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
