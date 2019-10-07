import React from 'react';

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.size.width,
      height: this.props.item.size.height,
    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.alignment}} className="image-item-container">
            <div
              id={ this.props.item.image._id + this.props.item.id }
              className="image-item"
              style={{
                  backgroundImage: `url(${this.props.item.image.link})`,
                  width: `${this.props.item.size.width}px`,
                  height: `${this.props.item.size.height}px`,
                  backgroundSize: 'contain',
              }}
            >
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
