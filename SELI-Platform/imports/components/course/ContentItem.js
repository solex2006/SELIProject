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
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'image' ?
                  <ImageItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'video' ?
                  <VideoItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'audio' ?
                  <AudioItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'pdf' ?
                  <PdfItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'compressed' ?
                  <CompressedItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'link' ?
                  <LinkItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
              {
                this.props.item.type === 'h5p' ?
                  <H5PItem
                    item={this.props.item}
                    removeItem={this.props.removeItem.bind(this)}
                  />
                :
                undefined
              }
            </div>
          :
          <div className="content-preview-container">
            {
                "Creating " + this.props.item.type + " content"
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
