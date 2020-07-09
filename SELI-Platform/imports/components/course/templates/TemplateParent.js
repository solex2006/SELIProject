import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  templateItem = (contentCode, label, type) => {
    var contentIndex;
    var classNameTemplate;
    contentIndex = this.props.arrayOfItems.findIndex(item => item.code === contentCode);
    if (type === 0) {
      classNameTemplate = "template-column-item";
    } else {
      classNameTemplate = "template-row-item";
    }
    return(
      <div
        style={
          contentIndex === -1 ?
            {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
        } className={classNameTemplate}
      >
        { contentIndex === -1 && (
          <div className="template-background-text">
            {label}
          </div> 
        )}
        <Container
          dragBeginDelay={500}
          dragClass="drag-class"
          style={{width: "100%", height: "calc(100% - 37px)"}}
          groupName="1"
          behaviour="drop-zone"
          onDrop={e => this.props.openDialog(e, contentCode)}
        >
          {
            this.props.arrayOfItems.length > 0 && this.props.arrayOfItems.length > contentIndex && contentIndex > -1 && (
              <Draggable key={contentIndex}>
                <ContentItem
                  fromTemplate
                  item={this.props.arrayOfItems[contentIndex]}
                  removeItem={this.props.removeItem.bind(this)}
                  editItem={this.props.editItem.bind(this)}
                  handleDecorative={this.props.handleDecorative.bind(this)}
                  editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                  language={this.props.language}
                />
              </Draggable>
            )
          }
        </Container>
      </div>
    )
  }

  render() {
    return(
      <div className="template-container">
        {this.templateItem("txtContent", "Main Content", 0)}
        <div className="template-row">
          {this.templateItem("fileContent", "File", 1)}
          {this.templateItem("linkContent", "Links", 1)}
        </div>
        <div className="template-row">
          {this.templateItem("imgContent", "Image", 1)}
          {this.templateItem("videoContent", "Video", 1)}
        </div>
        {this.templateItem("audContent", "Audio", 0)}
        {this.templateItem("embContent", "Embeded", 0)}
        {this.templateItem("untContent", "Unity", 0)}
      </div>
    );
  }
}
