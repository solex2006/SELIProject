import React from 'react';
import { Resizable } from "re-resizable";
import MenuItem from './MenuItem';
import ItemFeedback from '../../accessibility/ItemFeedback';

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
    }
  }

  changeImageSize(){
    let image = document.getElementById(this.props.item.attributes.image._id+this.props.item.id);
    image.style.backgroundSize = `${image.clientWidth}px`;
    this.resizeText();
  }

  setImageSize(e, direction, ref, d){
    let width = document.getElementById(this.props.item.attributes.image._id + this.props.item.id).clientWidth;
    let item = this.props.item;
    item.attributes.size.width = width,
    item.attributes.size.height += d.height,
    this.setState({
      width: this.props.item.attributes.size.width ,
      height: this.props.item.attributes.size.height,
    });
    this.resizeText();
  }

  resizeText(){
    let item = this.props.item;
    this.setState({
      changingSize: true,
    });
    if(this.props.item.attributes.description !== "" && (this.props.item.attributes.alignment === "row" || this.props.item.attributes.alignment === "row-reverse")){
      let image = document.getElementById(this.props.item.attributes.image._id+this.props.item.id);
      let text = document.getElementById(this.props.item.attributes.image._id + "description" + this.props.item.id);
      var style = image.currentStyle || window.getComputedStyle(image),
      width = image.offsetWidth, // or use style.width
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      let imageWidth = width + margin - padding + border + 30;
      this.props.item.attributes.descriptionWidth = `calc(100% - ${imageWidth}px)`;
    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <Resizable
              size={{
                width: this.props.item.attributes.size.width,
                height: this.props.item.attributes.size.height,
              }}
              className="resizable-item"
              onResize={(e, direction, ref, d) => {
                this.changeImageSize();
              }}
              onResizeStop={(e, direction, ref, d) => {
                this.setImageSize(e, direction, ref, d);
              }}
              handleComponent={{
                bottomRight: <div className="bottom-right-resize"></div>,
                topRight: <div className="top-right-resize"></div>,
                bottomLeft: <div className="bottom-left-resize"></div>,
                topLeft: <div className="top-left-resize"></div>,
                centerLeft: <div className="top-left-resize"></div>,
              }}
            >
              <div
                id={ this.props.item.attributes.image._id + this.props.item.id }
                className="image-item"
                style={{
                  backgroundImage: `url(${this.props.item.attributes.image.link})`,
                  backgroundSize: `${this.props.item.attributes.size.width}px`,
                }}></div>
            </Resizable>
            {
              this.props.item.attributes.hasDescription ?
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
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
          />
        </div>
        <ItemFeedback
          accessibility={this.props.item.attributes.accessibility}
        />
      </div>
      );
    }
  }
