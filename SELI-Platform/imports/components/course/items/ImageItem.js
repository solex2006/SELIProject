import React from 'react';
import ItemFeedback from '../../accessibility/ItemFeedback';
import DiscreteSlider from './DiscreteSlider';
import TextAlternatives from '../../accessibility/alternative/TextAlternatives';
import Typography from '@material-ui/core/Typography';
import MediaPlayer from '../../tools/MediaPlayer';

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
      shortlongDescription: '',
      openMedia: false,
      index: 0
    }
  }

  adjust=(width, height)=>{
    this.props.item.attributes.size.width=width
    this.props.item.attributes.size.height=height
    this.setState({
      width: this.props.item.attributes.size.width ,
      height: this.props.item.attributes.size.height,
    });
  }

  textAlternatives=()=>{
    return(
      <TextAlternatives
        item={this.props.item}
        language={this.props.language}
      ></TextAlternatives>
    )
  }

	handleOpenMedia = (index) => {
    if (!this.props.fromProgram) {
      this.setState({
        openMedia: true,
        index: index,
      });
    }
  }
  
  handleCloseMedia = () => {
    this.setState({
      openMedia: false,
      index: 0
    });
  }

  imageItem = () => {
    const a11y = this.props.item.attributes.accessibility;
    var altText = "";
    if (a11y.dataField && a11y.dataField.shortDescription !== "") {
      if (this.props.item.attributes.accessibility.dataField.imagePurpose==='deco') altText =""
      else altText = a11y.dataField.shortDescription
    } else altText = this.props.item.attributes.title;
    return (
      <img
        tabIndex={altText !== "" ? "0" : "-1"}
        src={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())}
        style={{
          height: `${this.state.height}px`,
          transform: `rotate(${this.props.item.attributes.image!=undefined?this.props.item.attributes.image.coordenada:0}deg)`,
        }}
        alt={altText}
        className="file-image-preview-image"
        onClick={() => this.handleOpenMedia(0)}
      />
    )
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes.accessibility.dataField != undefined && this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='top'?
            this.textAlternatives()
          :
            undefined
        }
        {this.props.fromProgram && <DiscreteSlider size={this.props.item.attributes.size.height} adjust={this.adjust}/>}
        <figure 
          role="group"
          style={{flexDirection: this.props.item.attributes.alignment}} 
          className="media-item-container"
        >
          {this.imageItem()}
          <Typography tabIndex="0" className="course-item-card-title" gutterBottom variant="h5" component="h2">
            {`${this.props.item.attributes.title}`}
          </Typography>
        </figure>
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
        {
          !this.props.fromProgram &&
          <MediaPlayer
            index={this.state.index}
            openMedia={this.state.openMedia}
            mediaItems={[this.props.item]}
            handleCloseMedia={this.handleCloseMedia.bind(this)}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
