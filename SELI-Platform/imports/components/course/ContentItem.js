import React from 'react';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

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
import EmbebedItem from './items/EmbebedItem';

export default class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'text' ?
                  <TextItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'image' ?
                  <ImageItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    handleDecorative={this.props.handleDecorative.bind(this)}
                    editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'video' ?
                  <VideoItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    handleDecorative={this.props.handleDecorative.bind(this)}
                    editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              
              {
                this.props.item.type === 'audio' ?
                  <AudioItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    handleDecorative={this.props.handleDecorative.bind(this)}
                    editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'pdf' ?
                  <PdfItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'compressed' ?
                  <CompressedItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'link' ?
                  <LinkItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'h5p' ?
                  <H5PItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'quiz' ?
                  <QuizItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'activity' ?
                  <ActivityItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'embebed' ?
                  <EmbebedItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                    editItem={this.props.editItem.bind(this)}
                    language={this.props.language}
                  />
                :
                undefined
              }
            </div>
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
