import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  shouldAcceptDrop = (payload, contentCode, contentIndex) => {
    if (payload.type === contentCode) {
      return true;
    } else if (contentCode === "main") {
      if (payload.type === "text" || payload.type === "link") {
        return true;
      }
    } else if (contentCode === "file") {
      if (payload.type === "pdf" || payload.type === "compressed") {
        return true;
      }
    } else if (contentCode === "embeddedh5p") {
      if (payload.type === "embedded" || payload.type === "h5p") {
        return true;
      }
    }
    return false;
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
          shouldAcceptDrop={(cont, payload) => this.shouldAcceptDrop(payload, contentCode, contentIndex)}
        >
          {
            this.props.arrayOfItems.length > 0 && this.props.arrayOfItems.length > contentIndex && contentIndex > -1 && (
              <Draggable key={contentIndex}>
                <ContentItem
                  fromTemplate
                  item={this.props.arrayOfItems[contentIndex]}
                  arrayOfDesignItems={this.props.arrayOfDesignItems}
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
        <div className="template-row">
          {
            this.props.selected[3] === 2 ?
              this.props.arrayOfDesignItems.type === "1" ? this.templateItem("activity", "Activity Item", 0) :
              this.props.arrayOfDesignItems.type === "2" ? this.templateItem("activity", "Problem Item", 0) :
              this.props.arrayOfDesignItems.type === "3" ? this.templateItem("quiz", "Quiz Item", 0) :
              this.props.arrayOfDesignItems.type === "4" ? this.templateItem("activity", "Forum Item", 0) : undefined
            :
              this.templateItem("main", "Main Content", 0)
          }
        </div>
        <div className="template-row">
          {this.templateItem("file", "Files", 1)}
          {this.templateItem("link", "Links", 1)}
        </div>
        {
          this.props.arrayOfDesignItems.tools[2].checked && this.props.arrayOfDesignItems.tools[5].checked ?
            <div className="template-row">
              {this.templateItem("image", "Images", 1)}
              {this.templateItem("video", "Videos", 1)}
            </div>
          :
            <div className="template-row">
              {this.props.arrayOfDesignItems.tools[2].checked && this.templateItem("image", "Images", 0)}
              {this.props.arrayOfDesignItems.tools[5].checked && this.templateItem("video", "Videos", 0)}
            </div>
        }
        <div className="template-row">{this.props.arrayOfDesignItems.tools[0].checked && this.templateItem("audio", "Audios", 0)}</div>
        <div className="template-row">{this.templateItem("embeddedh5p", "Embedded Content", 0)}</div>
        <div className="template-row">{this.props.arrayOfDesignItems.tools[1].checked && this.templateItem("untity", "Unity Content", 0)}</div>
      </div>
    );
  }
}
