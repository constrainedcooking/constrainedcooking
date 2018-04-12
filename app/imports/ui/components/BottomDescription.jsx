import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class BottomDescription extends React.Component {
  render() {
    const divStyle = { paddingTop: '30px' };
    return (
        <div style = {divStyle} className='landing-colorblock'>
          <Grid textAlign='center' container columns={3}>
              <Grid.Column>
                <Image centered src="/images/fridgeicon.png" size='small'/>
                <Header as = 'h3'>Limited groceries? Tight on money? This recipe book shows the price and location of each ingredient.</Header>
              </Grid.Column>
              <Grid.Column>
                <Image centered src="/images/vendoricon.png" size='small'/>
                <Header as = 'h3'>Are you a local vendor? Create an account and let users know about your shop.</Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Image centered src="/images/microwaveicon.png" size='small'/>
                <Header as = 'h3'>Recipes are tailored to limited kitchen facilities. No stove, no problem!</Header>
              </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default BottomDescription;
