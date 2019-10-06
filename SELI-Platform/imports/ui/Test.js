import React, { Component } from 'react';

import AudioAccessibilityForm from '../components/accessibility/AudioAccessibilityForm'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  handleInputOnChange(){}

  render() {
    return(
      <div>
        <AudioAccessibilityForm
          data={{
            handleInputOnChange: this.handleInputOnChange.bind(this),
            dataField: {shortDescriptionError: '', shortDescription: ''}
          }}
        />
      </div>
    )
  }
}
