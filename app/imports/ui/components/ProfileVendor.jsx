import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ redirectTo: true });
  }
  render() {
    if (this.props.clickable === true) {
      if (this.state.redirectTo === true) {
        return <Redirect to={`/vendorview/${this.props.user._id}`}/>;
      }
    }
    function getRandomColor() {
      const colors = ['orange', 'green', 'silver', 'coral', 'LightSkyBlue',
        'wheat', 'Tomato', 'Thistle', 'PeachPuff', 'LightSeaGreen',
      ];
      const numb = Math.floor(Math.random() * 10);
      return colors[numb];
    }
    const color = getRandomColor();
    const imageSize = { height: '100px', width: '100px' };
    let cardProperties = { height: '125px', width: '250px' };
    if (this.props.colorvisible) {
      cardProperties = { height: '125px', width: '250px', background: color };
    }
    return (
        <Card centered size={this.props.size} onClick={this.onClick} color='red' style={cardProperties}>
          <Card.Content>
            <Card.Header>
              {this.props.user.userName}
              <Image src={this.props.user.image } style={imageSize} floated='right' circular/>
            </Card.Header>
            <Card.Meta>
              {this.props.user.firstName} {this.props.user.lastName}
            </Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileVendor.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  clickable: PropTypes.bool.isRequired,
  colorvisible: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileVendor);
