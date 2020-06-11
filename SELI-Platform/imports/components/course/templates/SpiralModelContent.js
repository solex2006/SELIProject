import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class SpiralModelContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="template-container">
        <div className="template-title">
          {`${this.props.courseInformation.title} - ${this.props.courseInformation.program[this.props.selected[0]].name}`}
        </div>
        <div className="spiral-row-1">
          <div
            style={
              true ?
                {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
            } className="spiral-main-content"
          >
            { true && (
                <div className="template-background-text">
                  Main Content
                </div> )
            }
            <Container
              lockAxis="y"
              dragBeginDelay={500}
              dragClass="drag-class"
              groupName="1"
              getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
              onDrop={e => this.props.openDialog(e)}>
              <ContentItem
                fromTemplate
                item={this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[0]}
                removeItem={this.props.removeItem.bind(this)}
                editItem={this.props.editItem.bind(this)}
                handleDecorative={this.props.handleDecorative.bind(this)}
                editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                language={this.props.language}
              />
              {/* {
                this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.map((p, i) => {
                  return (
                    <Draggable key={i}>
                      <ContentItem
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
              } */}
            </Container>
          </div>
          <div
            style={
              true ?
                {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
            } className="spiral-image-top"
          >
            { true && (
                <div className="template-background-text">
                  {this.props.language.image}
                </div> )
            }
            <Container
              lockAxis="y"
              dragBeginDelay={500}
              dragClass="drag-class"
              groupName="1"
              getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
              onDrop={e => this.props.openDialog(e)}>
              <ContentItem
                fromTemplate
                item={this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[1]}
                removeItem={this.props.removeItem.bind(this)}
                editItem={this.props.editItem.bind(this)}
                handleDecorative={this.props.handleDecorative.bind(this)}
                editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                language={this.props.language}
              />
            </Container>
          </div>
        </div>
        <div className="spiral-row-2">
          <div
            style={
              /* !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ? */
                {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
              /* :
                {backgroundImage: "url()"} */} className="spiral-image-video"
          >
            { true && (
                <div className="template-background-text">
                  {`${this.props.language.image} ${this.props.language.or} ${this.props.language.video}`}
                </div> )
            }
            <Container
              lockAxis="y"
              dragBeginDelay={500}
              dragClass="drag-class"
              groupName="1"
              getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
              onDrop={e => this.props.openDialog(e)}>
              <ContentItem
                fromTemplate
                item={this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[2]}
                removeItem={this.props.removeItem.bind(this)}
                editItem={this.props.editItem.bind(this)}
                handleDecorative={this.props.handleDecorative.bind(this)}
                editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                language={this.props.language}
              />
            </Container>
          </div>
          <div
            style={
              true ?
                {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
            } className="spiral-sub-content"
          >
            { true && (
                <div className="template-background-text">
                  Subcontent
                </div> )
            }
            <Container
              lockAxis="y"
              dragBeginDelay={500}
              dragClass="drag-class"
              /* style={{width: "100%", height: "calc(100% - 3.2vh)", "margin-top": "3.2vh"}} */
              groupName="1"
              getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
              onDrop={e => this.props.openDialog(e)}>
              <ContentItem
                fromTemplate
                item={this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[3]}
                removeItem={this.props.removeItem.bind(this)}
                editItem={this.props.editItem.bind(this)}
                handleDecorative={this.props.handleDecorative.bind(this)}
                editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                language={this.props.language}
              />
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
