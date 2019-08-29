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
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <video id={ this.props.item.attributes.video.id + this.props.item.id } className="video-item" controls>
              <source src={this.props.item.attributes.video.link}></source>
            </video>
            {
              this.props.item.attributes.description !== "" ?
                <div
                  id={this.props.item.attributes.video._id+"description"+this.props.item.id}
                  style={{width: this.props.item.attributes.descriptionWidth}}
                  className={
                    this.props.item.attributes.alignment === "row" || this.props.item.attributes.alignment === "row-reverse" ?
                      "image-item-description"
                    :
                    "image-item-description-full"
                  }
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                >
                </div>
              :
                undefined
            }
          </div>
        </div>
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
