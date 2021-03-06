import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
  render() {
    return (
          <Card href = {`/#/viewrecipe/${this.props.recipe._id}`} >
            <Image src={this.props.recipe.image} size = 'medium'/>
            <Card.Content>
              <Card.Header>
                {this.props.recipe.name}
              </Card.Header>
              <Card.Description>
                {this.props.recipe.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {this.props.recipe.tags.map((tag, idx) => (
                  <Label key = {idx} tag>{tag}</Label>
              ))}
            </Card.Content>
          </Card>

    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Recipe);
