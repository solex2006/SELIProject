import React from 'react';

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <div
              id={ this.props.item.attributes.image._id + this.props.item.id }
              className="image-item"
              style={{
                  backgroundImage: `url(${this.props.item.attributes.image.link})`,
                  backgroundSize: `${this.props.item.attributes.size.width}px`,
              }}></div>
            {
              this.props.item.attributes.description !== "" ?
                <div
                  id={this.props.item.attributes.image._id+"description"+this.props.item.id}
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
      </div>
      );
    }
  }
