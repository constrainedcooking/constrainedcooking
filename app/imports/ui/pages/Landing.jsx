import React from 'react';
import MidDescription from '../components/MidDescription';
import BottomDescription from '../components/BottomDescription';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
       <div>
         <MidDescription/>
         <BottomDescription/>
       </div>
    );
  }
}

export default Landing;
