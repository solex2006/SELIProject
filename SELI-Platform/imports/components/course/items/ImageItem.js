import React from 'react';
import ItemFeedback from '../../accessibility/ItemFeedback';
import ResizableContent from './ResizableContent';
import DiscreteSlider from './DiscreteSlider';
//import CheckboxLabels from './CheckBox';
import TextAlternatives from '../../accessibility/alternative/TextAlternatives';
import Typography from '@material-ui/core/Typography';

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 360,
      height: 270,
      shortlongDescription: ''
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

/*   checkBoxLabels=()=>{
    return(
      <div className="checkBoxItem">
        {
          this.props.item.attributes.accessibility.dataField===undefined?
            undefined
          :
            <div className="checkBoxItem"> 
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose!=undefined?
                  <div className="checkboxstyle">
                    <CheckboxLabels
                        language={this.props.language}
                        checkbox={this.checkbox}
                        type="shortLongDescription"
                        label={this.props.language.textAlternatives}
                    />
                  </div>
                  :
                  undefined
              }
            </div>
        }
      </div>
    )
  }

  checkbox=(event, name)=>{
   // console.log("event and name", event, name)
    if(event===true && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'shortlongDescription',
      })
    }
    else if(event===false && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'noshortlongDescription'
      })
    }
  } */

  textAlternatives=()=>{
    return(
      <TextAlternatives
        item={this.props.item}
        language={this.props.language}
      ></TextAlternatives>
    )
  }

  openFullScreen = () => {
    console.log("imageS")
		if (this.props.openMedia) this.props.openMedia(this.props.item);
	}

  render() {
    return(
      <div className="content-box">
        {/* this.checkBoxLabels() */}
        {
          this.props.item.attributes.accessibility.dataField != undefined && this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='top'?
            this.textAlternatives()
          :
            undefined
        }
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className={this.props.fromTemplate ? "image-item-container-template" : "image-item-container"}>
            <div className="image-item-container-child" onClick={() => this.openFullScreen()}>
              {this.props.fromProgram && <DiscreteSlider adjust={this.adjust}/>}
              <ResizableContent
                key={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.coordenada):(Math.random())}
                top={0}
                minWidth={10}
                minHeight={10}
                left={0}
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
            <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
              {`${this.props.item.attributes.title}`}
            </Typography>
            {/* {
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
            } */}
          </div>
        </div>
        {
          this.props.item.attributes.accessibility.dataField!=undefined && this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='bottom'?
            this.textAlternatives()
          :
            undefined
        }
        {this.props.fromProgram && 
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
