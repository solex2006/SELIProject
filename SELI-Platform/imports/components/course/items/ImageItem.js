import React from 'react';
import MenuItem from './MenuItem';
import ItemFeedback from '../../accessibility/ItemFeedback';
import ResizableContent from './ResizableContent'
import DiscreteSlider from './DiscreteSlider'
import Divider from '@material-ui/core/Divider';

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
    //let width = document.getElementById(this.props.item.attributes.image._id + this.props.item.id).clientWidth;
    let item = this.props.item;
    item.attributes.size.width = width,
    item.attributes.size.height = height,
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

  adjust=(width, height)=>{
    /* this.setState({
      width:width,
      height:height
    }) */
    this.props.item.attributes.size.width=width
    this.props.item.attributes.size.height=height
    this.setState({
      width: this.props.item.attributes.size.width ,
      height: this.props.item.attributes.size.height,
    });
    
    //this.resizeText();
  }
  
  


  render() {
    if(this.state.width != this.state.height){
      this.setState({
        width: 300,
        height: 300,
      });
    }
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <div>
              <DiscreteSlider adjust={this.adjust}/> 
              <ResizableContent
                key={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.coordenada):(Math.random())}
                top={8}
                minWidth={10}
                minHeight={10}
                left={8}
                width={this.state.width}
                height={this.state.height}
                rotateAngle={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.coordenada):(Math.random())}
                //adjust={this.adjust}
                //coordenada={this.props.coordenada}
              //coordenadaCursos={this.coordenadaCursos}
              > 
                {/* <img  style={{ width: `${this.state.width}px`, height: `${this.state.height}px`, }}  src={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())}></img> */}
                <div 
                  style={{
                    width: `${this.state.width}px`, height: `${this.state.height}px`, 
                    backgroundImage: `url(${(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())})`
                  }} 
                  className="file-image-preview"
                ></div>
              </ResizableContent>
            </div>
            {
              this.props.item.attributes.hasDescription ?
                <div
                  id={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image._id+"description"+this.props.item.id):(Math.random())}
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
        <Divider orientation="vertical" />
      
        <div className="menu-content-item">     
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          />
        </div>
        <ItemFeedback
          accessibility={this.props.item.attributes.accessibility}
          language={this.props.language}
        />
      </div>
      );
    }
  }
