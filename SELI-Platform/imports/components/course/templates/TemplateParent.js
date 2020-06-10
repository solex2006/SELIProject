import React from 'react';
import VerticalPanel from './VerticalPanel';
import SpiralModelContent from './SpiralModelContent';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="course-creator-container">
        <div className="course-creator-work-area">
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
          <VerticalPanel
            courseInformation={this.props.courseInformation}
            menuTab={this.props.menuTab}
            selected={this.props.selected}
            expandedNodes={this.props.expandedNodes}
            contentItems={this.props.contentItems}
            setMenuTab={this.props.setMenuTab.bind(this)}
            toggleSortMode={this.props.toggleSortMode.bind(this)}
            handlePreview={this.props.handlePreview.bind(this)}
            setDisabilitieOption={this.props.setDisabilitieOption.bind(this)}
            warningOrganization={this.props.warningOrganization.bind(this)}
            reRender={this.props.reRender.bind(this)}
            turnOffSortMode={this.props.turnOffSortMode.bind(this)}
            language={this.props.language}
          ></VerticalPanel>
        </div>
      </div>
    );
  }
}
