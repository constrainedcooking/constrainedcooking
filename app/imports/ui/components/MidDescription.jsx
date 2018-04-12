import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class MidDescription extends React.Component {
  render() {
    const divStyle = { paddingBottom: '50px' };
    return (
        <div style = {divStyle} className = 'constrainedcooking-background'>
          <Grid centered container columns={2}>
            <Grid.Row>
              <Image src = "/images/logo.png" centered/>
            </Grid.Row>
            <Grid.Row>
              <Header as = 'h1' textAlign = 'center'> Healthy, inexpensive recipes for college students, by college students!</Header>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default MidDescription;
