import React from 'react';
import ContentItem from '../ContentItem';
import SortItem from '../items/SortItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';
import VerticalPanel from './VerticalPanel';

export default class FreeWithout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="course-creator-container">
        {
          this.props.courseInformation.organization ?
            <div className="course-creator-work-area">
              {
                this.props.courseInformation.organization.subunit ?
                  <div
                    style={
                      !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ?
                        {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
                      :
                      {backgroundImage: "url()"}} className="course-creator-drop-area"
                  >
                    <div className="title-course">
                      <div className="subtitle">{`${this.props.courseInformation.title} -
                      ${this.props.language.unit}: `+`${this.props.courseInformation.program[this.props.selected[0]].name} -
                      ${this.props.language.lesson}: ` +`${this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}</div>
                    </div>
                    {
                      !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ?
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
                          style={{width: "100%", height: "calc(100% - 3.2vh)", "margin-top": "3.2vh"}}
                          groupName="1"
                          getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
                          onDrop={e => this.props.openDialog(e)}>
                          {
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
                          }
                        </Container>
                      :
                        <Container
                          lockAxis="y"
                          dragBeginDelay={0}
                          dragClass="drag-class"
                          style={{width: "100%", height: "calc(100% - 3.2vh)", "margin-top": "3.2vh"}}
                          groupName="1"
                          getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
                          onDrop={e => this.props.openDialog(e)}
                        >
                          {
                            this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.map((p, i) => {
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
                :
                  <div
                    style={
                      !this.props.courseInformation.program[this.props.selected[0]].items.length ?
                        {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
                      :
                      {backgroundImage: "url()"}} className="course-creator-drop-area"
                  >
                    <div className="title-course">  
                      <div className="subtitle">{`${this.props.courseInformation.title} - 
                        ${this.props.language.topic}: ` +`${this.props.courseInformation.program[this.props.selected[0]].name}`}</div>
                    </div>
                    {
                      !this.props.courseInformation.program[this.props.selected[0]].items.length ?
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
                          style={{width: "100%", height: "calc(100% - 3.2vh)", "margin-top": "3.2vh"}}
                          groupName="1"
                          getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].items[i]}
                          onDrop={e => this.props.openDialog(e)}>
                          {
                            this.props.courseInformation.program[this.props.selected[0]].items.map((p, i) => {
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
                          style={{width: "100%", height: "calc(100% - 3.2vh)", "margin-top": "3.2vh"}}
                          groupName="1"
                          getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].items[i]}
                          onDrop={e => this.props.openDialog(e)}
                        >
                          {
                            this.props.courseInformation.program[this.props.selected[0]].items.map((p, i) => {
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
              }
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
          :
            undefined
        }
        </div>
    );
  }
}
