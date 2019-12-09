import React, { Component} from 'react';
import { Container, Accordion, Icon, List } from 'semantic-ui-react';
import "../style.css";

class FAQs extends Component {
  state = { activeIndex: 0 }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    return (
      <Accordion fluid styled className='FAQ-Accordion'>
        
      </Accordion>
    )
  }
}

export default FAQs;