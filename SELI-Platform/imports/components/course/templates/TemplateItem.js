import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#ffffff",
    }
  }

  onDragStart = ({isSource, payload, willAcceptDrop}) => {
    if (!willAcceptDrop) {
      this.setState({
        backgroundColor: "#8d000034"
      })
    }
  }

  onDragEnd = ({isSource, payload, willAcceptDrop}) => {
    this.setState({
      backgroundColor: "#ffffff"
    })
  }

  shouldAcceptDrop = (payload, contentCode, contentLength) => {
    if (payload.type === contentCode) {
      if (contentCode === "video" || contentCode === "image") {
        if (contentLength >= 8) {
          return false;
        }
      }
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
    } else if (contentCode === "task") {
      if (payload.type === "quiz" || payload.type === "activity") {
        if (contentLength >= 1) {
          return false;
        }
        if (this.props.taskType === "3" && payload.type === "quiz") {
          return true;
        }
        if (this.props.taskType !== "3" && payload.type === "activity") {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return(
      <div
        style={
          this.props.contentLength === 0 ?
            {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1", "background-color": this.state.backgroundColor} : 
            {backgroundImage: "none", "background-color": this.state.backgroundColor}
        } className={this.props.classNameTemplate}
      >
        { this.props.contentLength === 0 && (
          <div className="template-background-text">
            {this.props.label}
          </div> 
        )}
        <Container
          dragClass="drag-class"
          style={{width: "100%", height:"calc(100% - 37px)", minHeight: "163px"}}
          groupName="1"
          behaviour="drop-zone"
          dragHandleSelector=".item-drag-handle"
          getChildPayload={i => this.props.arrayOfItems[i]}
          onDrop={e => this.props.openDialog(e, this.props.contentCode)}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          shouldAcceptDrop={(cont, payload) => this.shouldAcceptDrop(payload, this.props.contentCode, this.props.contentLength)}
        >
          {
            this.props.arrayOfItems.map((p, i) => {
              return (
                <Draggable key={i}>
                  <ContentItem
                    fromTemplate
                    fromProgram
                    item={p}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    handleDecorative={this.props.handleDecorative.bind(this)}
                    editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                    language={this.props.language}
                  />
                </Draggable>
              );
            })
          }
        </Container>
      </div>
    );
  }
}
