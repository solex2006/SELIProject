import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import "../style.css";
import { Link } from '../routes';
import BaseLayout from './BaseLayout'

// This is a Head Component, from next!!
import Head from 'next/head';
// My own NavBar component
import NavBar from './NavBar';

// Popunder modal for mobile viewers
import MobilePopUnder from './MobilePopUnder';

//import { KEY } from '../server';
// TODO put image in a grid so its somewhat responsive
export default props => {
  return (
    <BaseLayout>
      <NavBar />
      <div className="hero">
         <Container>
          <div className="hero-text">
            <h2 id='Hero-Subtitle'></h2>
            <Link route={`/vows/new`}><Button id='Hero-Button' primary size='big'>Issue Certificate</Button></Link>
          </div>
          </Container>
        <img className='hero-image' src='../../static/seli.png'/>
      </div>

      <Container>
        {props.children}
      </Container>

      <MobilePopUnder/>
    </BaseLayout>
  );
};
