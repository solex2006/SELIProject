import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuItem from './items/MenuItem';
import TextItem from './items/TextItem';
import ImageItem from './items/ImageItem';
import VideoItem from './items/VideoItem';
import AudioItem from './items/AudioItem';
import PdfItem from './items/PdfItem';
import CompressedItem from './items/CompressedItem';
import LinkItem from './items/LinkItem';
import H5PItem from './items/H5PItem';
import QuizItem from './items/QuizItem';
import ActivityItem from './items/ActivityItem';
import EmbeddedItem from './items/EmbeddedItem';

import DragItem from './items/DragItem';
import Divider from '@material-ui/core/Divider';

export default class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    let audioBoton=document.getElementById("foco");
    audioBoton.focus()
    //let titulo=document.getElementById("course-title");
    //titulo.focus()
  }

  render() {
    return(
      <div className="content-item" id="foco" aria-labelledby="acc1id" >
        
        {
          this.props.item.attributes !== undefined ?
            <React.Fragment>
              <div className="draggable-item">
                {
                  this.props.item.type === 'text' ?
                    <TextItem

                      item={this.props.item}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'image' ?
                    <ImageItem
                      item={this.props.item}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                      fromTemplate={this.props.fromTemplate ? this.props.fromTemplate: undefined}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'video' ?
                    <VideoItem
                      item={this.props.item}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                      fromTemplate={this.props.fromTemplate ? this.props.fromTemplate: undefined}
                    />
                  :
                  undefined
                }
                
                {
                  this.props.item.type === 'audio' ?
                    <AudioItem
                      item={this.props.item}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'pdf' ?
                    <PdfItem
                      item={this.props.item}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'compressed' ?
                    <CompressedItem
                      item={this.props.item}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'link' ?
                    <LinkItem
                      item={this.props.item}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'h5p' ?
                    <H5PItem
                      item={this.props.item}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'quiz' ?
                    <QuizItem
                      item={this.props.item}
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      toResolve={this.props.toResolve ? this.props.toResolve : undefined}
                      course={this.props.courseId ? this.props.courseId : undefined}
                      handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
                      completeActivity={this.props.completeActivity ? this.props.completeActivity.bind(this) : undefined}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'activity' ?
                    <ActivityItem
                      item={this.props.item}
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      toResolve={this.props.toResolve ? this.props.toResolve : undefined}
                      handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
                      completeActivity={this.props.completeActivity ? this.props.completeActivity.bind(this) : undefined}
                      language={this.props.language}
                      fromProgram={this.props.fromProgram ? this.props.fromProgram : undefined}
                    />
                  :
                  undefined
                }
                {
                  this.props.item.type === 'embedded' ?
                    <EmbeddedItem
                      item={this.props.item}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.props.fromProgram && (
                    <div className="menu-content-item">
                      <MenuItem
                        item={this.props.item}
                        removeItem={this.props.removeItem.bind(this)}
                        editItem={this.props.editItem.bind(this)}
                        handleDecorative={this.props.handleDecorative.bind(this)}
                        editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                        language={this.props.language}
                      />
                      <Divider light={true} orientation="vertical"/>
                      {
                        !this.props.fromTemplate &&
                        <DragItem
                          holdanddrag={this.props.language.holdanddrag}
                        />
                      }
                    </div>
                  )
                }
              </div>
              { this.props.fromProgram && <Divider light={true} />}
            </React.Fragment>
          :
            <div className="content-preview-container">
              {
                `${this.props.language.creating}: ${this.props.language[this.props.item.type]}`
              }
              <div className="linear-creating-container">
                <LinearProgress valueBuffer={95} color="secondary" />
              </div>
            </div>
        }
      </div>
      );
    }
  }
