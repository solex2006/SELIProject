import React from 'react';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'video' ?
                  <div>
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
                        this.props.item.attributes.video.source === 'upload' ?
                          <video id={ this.props.item.attributes.video.id + this.props.item.id } className="video-item" controls>
                            <source src={this.props.item.attributes.video.url}></source>
                          </video>
                        :
                        <iframe width="500" height="300"
                          src={this.props.item.attributes.video.url}>
                        </iframe>
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
            </div>
          :
          undefined
        }
      </div>
      );
    }
  }
