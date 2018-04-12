import React from 'react';
import { Card, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
  render() {
    return (
        <Card centered>
          <Image src={this.props.recipe.image} />
          <Card.Content>
            <Card.Header centered>
              {this.props.recipe.Name}
            </Card.Header>
            <Card.Description>
              {this.props.recipe.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.recipe.tag}
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
