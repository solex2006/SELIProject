import React, { Component} from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import "../style.css";
import BaseLayout from '../components/BaseLayout';


class About extends Component {

  render() {
    return (
      <BaseLayout>
       The concept of the project approaches the topic of digital exclusion and the inaccessibility of education for disadvantaged groups as forming a set of challenges that offer the potential for improving the digital competences of teachers in the LAC and EU regions, and can lead to the extensive participation of citizens who have relatively poor access to innovative technologies involved in education, training and inclusion through ICT. Project activities are related to fostering more efficient ICT solutions for better education and inclusion.
      </BaseLayout>
    )
  }
}

export default About;
