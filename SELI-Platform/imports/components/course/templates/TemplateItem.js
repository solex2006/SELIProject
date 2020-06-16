import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div
        style={
          this.props.contentIndex === -1 ?
            {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
        } className={this.props.classNameTemplate}
      >
        { this.props.contentIndex === -1 && (
            <div className="template-background-text">
              {this.props.label}
            </div> )
        }
        <Container
          lockAxis="y"
          dragBeginDelay={500}
          dragClass="drag-class"
          groupName="1"
          getChildPayload={i => this.props.item}
          onDrop={e => this.props.openDialog(e, this.props.contentCode)}>
          {
            this.props.contentIndex > -1 && (
              <ContentItem
                fromTemplate
                item={this.props.item}
                removeItem={this.props.removeItem.bind(this)}
                editItem={this.props.editItem.bind(this)}
                handleDecorative={this.props.handleDecorative.bind(this)}
                editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                language={this.props.language}
              />
            )
          }
        </Container>
      </div>
    );
  }
}
