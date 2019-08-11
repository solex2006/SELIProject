import React from 'react';
import { Resizable } from "re-resizable";

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
    }
  }

  changeImageSize(){
    let image = document.getElementById(this.props.item.attributes.image.id+this.props.item.id);
    image.style.backgroundSize = image.clientWidth + "px";
    this.resizeText();
  }

  setImageSize(e, direction, ref, d){
    let width = document.getElementById(this.props.item.attributes.image.id+this.props.item.id).clientWidth;
    let item = this.props.item;
    item.attributes.size.width = width,
    item.attributes.size.height += d.height,
    this.setState({
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
    });
    this.resizeText();
  }

  resizeText(){
    if(this.props.item.attributes.description !== "" && this.props.item.attributes.alignment !== "center"){
      let image = document.getElementById(this.props.item.attributes.image.id+this.props.item.id);
      let text = document.getElementById(this.props.item.attributes.image.id + "description" + this.props.item.id);

      var style = image.currentStyle || window.getComputedStyle(image),
      width = image.offsetWidth, // or use style.width
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      let imageWidth = width + margin - padding + border + 60;
      text.style.width = "calc(100% - " + imageWidth + "px)";
    }
  }

  componentDidMount(){
    document.getElementById(this.props.item.attributes.image.id+this.props.item.id).style.backgroundSize = this.props.item.attributes.size.width + "px";
  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'image' ?
                  <div>
                    <div id={this.props.item.attributes.image.id+"container"+this.props.item.id} className="image-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
                      {
                        this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-end" ?
                          <div id={this.props.item.attributes.image.id+"description"+this.props.item.id} className="image-item-description">
                            {this.props.item.attributes.description}
                          </div>
                        :
                        undefined
                      }
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
                      >
                        <img
                          id={ this.props.item.attributes.image.id+this.props.item.id }
                          className="image-item"
                          style={{
                            backgroundImage: "url(" + this.props.item.attributes.image.url + ")",
                            backgroundSize: this.props.item.attributes.size.width + "px",
                          }}></img>
                      </Resizable>
                      {
                        this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-start" ?
                          <div id={this.props.item.attributes.image.id+"description"+this.props.item.id} className="image-item-description">
                            {this.props.item.attributes.description}
                          </div>
                        :
                        undefined
                      }
                    </div>
                    {
                      this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "center" ?
                        <div id={this.props.item.attributes.image.id+"description"+this.props.item.id} className="image-item-description-full">
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
