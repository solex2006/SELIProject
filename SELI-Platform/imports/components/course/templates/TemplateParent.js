import React from 'react';
import SpiralModelContent from './SpiralModelContent';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div>
        <SpiralModelContent
          courseInformation={this.props.courseInformation}
          selected={this.props.selected}
          editItem={this.props.editItem.bind(this)}
          removeItem={this.props.removeItem.bind(this)}
          openDialog={this.props.openDialog.bind(this)}
          handleDecorative={this.props.handleDecorative.bind(this)}
          editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
          language={this.props.language}
        ></SpiralModelContent>
      </div>
    );
  }
}
