import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ContentMenuItem from '../ContentMenuItem';
import DisabilitieMenu from '../DisabilitieMenu';
import CourseCreatorMenu from '../CourseCreatorMenu';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../../../../lib/dragAndDropUtils';
import NavigationTool from '../NavigationTool';
import { DiVim } from 'react-icons/di';

export default class VerticalPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="course-creator-menu-area">
        <CourseCreatorMenu
          setMenuTab={this.props.setMenuTab.bind(this)}
          menuTab={this.props.menuTab}
          language={this.props.language}
        />
        {
          this.props.menuTab === 0 ?
            <div>
              <DisabilitieMenu
                disabilitieOptions={this.props.courseInformation.support}
                setOption={this.props.setDisabilitieOption.bind(this)}
                language={this.props.language}
              />
              <Divider light/><Divider light/><Divider light/>
              <div className="course-creator-menu-actions">
                <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.dragDropItems}/>
              </div>
              <Divider light/>
              <Container
                orientation="horizontal"
                groupName="1"
                behaviour="copy"
                getChildPayload={i => this.props.contentItems[i]}
                onDrop={e => this.setState({ contentItems: applyDrag(this.props.contentItems, e) })}
              >
                { 
                  this.props.contentItems.map((p,i) => {
                    return (
                      <Draggable key={i}>
                        <ContentMenuItem type={p.type} language={this.props.language}/>
                      </Draggable>
                    );
                  })
                }
              </Container>
              <div className="course-creator-menu-actions-container">
                <List className="course-creator-menu-actions" component="nav" aria-label="course-creator-menu-actions">
                  <Divider light/><Divider light/><Divider light/>
                  {
                    this.props.courseInformation.coursePlan.courseTemplate === 'without' && (
                      <React.Fragment>
                        <ListItem onClick={() => this.props.toggleSortMode()} selected={this.props.sortMode} className="course-creator-menu-action" button>
                          <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.sortMode}/>
                        </ListItem>
                        <Divider light/>
                      </React.Fragment>
                    )
                  }
                  <ListItem onClick={() => this.props.handlePreview()} className="course-creator-menu-action" button>
                    <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.seePreview}/>
                  </ListItem>
                  <Divider light/>
                </List>
              </div>
            </div>
          :
          undefined
        }
        {
          this.props.menuTab === 1 ?
            <div>
              <div className="button-row">
                <div fullWidth className="row-list-selected-button">
                  <Avatar 
                    id={this.props.courseInformation.coursePlan.courseStructure === "unit" ? "orange-avatar": "blue-avatar"} 
                    className="avatar">{this.props.courseInformation.coursePlan.courseStructure === "unit" ? "U" : "T"}
                  </Avatar>
                  {this.props.courseInformation.coursePlan.courseStructure === "unit" ? this.props.language.byUnitsAndLessons : this.props.language.byTopics}
                </div>
              </div>
              <NavigationTool
                program={this.props.courseInformation.program}
                coursePlan={this.props.courseInformation.coursePlan}
                selected={this.props.selected}
                expandedNodes={this.props.expandedNodes}
                reRender={this.props.reRender.bind(this)}
                turnOffSortMode={this.props.turnOffSortMode.bind(this)}
                setMenuTab={this.props.setMenuTab.bind(this)}
                dialog={true}
                language={this.props.language}
              />
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
