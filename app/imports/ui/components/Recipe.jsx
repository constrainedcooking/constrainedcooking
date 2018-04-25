import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
  render() {
    return (
        <Link to={`/viewrecipe/${this.props.recipe._id}`}>
          <div>
          <Card centered>
            <Image src={this.props.recipe.image}/>
            <Card.Content>
              <Card.Header centered>
                {this.props.recipe.name}
              </Card.Header>
              <Card.Description>
                {this.props.recipe.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {this.props.recipe.tags.map((tag) => (
                  <Label as='a' tag>{tag}</Label>
              ))}
            </Card.Content>
          </Card>
          </div>
        </Link>

    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Recipe);
