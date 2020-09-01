import React from 'react';
import { Container } from 'semantic-ui-react';
import "../style.css";
import BaseLayout from './BaseLayout'


export default props => {
  
  return (
    <BaseLayout>
      <div className="hero">
        <img className='hero-image' src='../../static/seli.png'/>
      </div>
      <Container>
        {props.children}
      </Container>
    </BaseLayout>
  );
};
