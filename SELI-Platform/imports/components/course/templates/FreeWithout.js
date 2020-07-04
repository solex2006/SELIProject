import React from 'react';
import ContentItem from '../ContentItem';
import SortItem from '../items/SortItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class FreeWithout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div
        style={
          !this.props.arrayOfItems.length ?
            {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
          :
          {backgroundImage: "url()"}} className="course-creator-drop-area"
      >
        {
          !this.props.arrayOfItems.length ?
            <div className="background">
              {this.props.language.dropHereLabel.toUpperCase()}
            </div>
          :
            undefined
        }
        {
          !this.props.sortMode ?
            <Container
              lockAxis="y"
              dragBeginDelay={500}
              dragClass="drag-class"
              style={{width: "100%", height: "100%"}}
              groupName="1"
              getChildPayload={i => this.props.arrayOfItems[i]}
              onDrop={e => this.props.openDialog(e)}>
              {
                this.props.arrayOfItems.map((p, i) => {
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
              }
            </Container>
          :
            <Container
              lockAxis="y"
              dragBeginDelay={0}
              dragClass="drag-class"
              style={{width: "100%", height: "100%"}}
              groupName="1"
              getChildPayload={i => this.props.arrayOfItems[i]}
              onDrop={e => this.props.openDialog(e)}
            >
              {
                this.props.arrayOfItems.map((p, i) => {
                  return (
                    <Draggable key={i}>
                      <SortItem
                        item={p}
                        removeItem={this.props.removeItem.bind(this)}
                        index={i}
                        language={this.props.language}
                      />
                    </Draggable>
                  );
                })
              }
            </Container>
        }
      </div>
    );
  }
}
