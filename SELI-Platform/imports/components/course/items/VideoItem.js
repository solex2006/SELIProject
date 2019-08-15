import React from 'react';
import MenuItem from './MenuItem';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="video-content-item">
              <div id={this.props.item.attributes.video.id+"container"+this.props.item.id} className="video-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
                {
                  this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-end" ?
                    <div id={this.props.item.attributes.video.id+"description"+this.props.item.id} className="video-item-description">
                      {this.props.item.attributes.description}
                    </div>
                  :
                  undefined
                }
                {
                  this.props.item.attributes.source === 'upload' ?
                    <video id={ this.props.item.attributes.video.id + this.props.item.id } className="video-item" controls>
                      <source src={this.props.item.attributes.video.url}></source>
                    </video>
                  :
                  undefined
                }
                {
                  this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-start" ?
                    <div id={this.props.item.attributes.video.id+"description"+this.props.item.id} className="video-item-description">
                      {this.props.item.attributes.description}
                    </div>
                  :
                  undefined
                }
              </div>
              {
                this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "center" ?
                  <div id={this.props.item.attributes.video.id+"description"+this.props.item.id} className="video-item-description-full">
                    {this.props.item.attributes.description}
                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
