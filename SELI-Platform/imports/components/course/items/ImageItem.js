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
        <div className="image-content-item">
          <div
            style={{flexDirection: this.props.item.attributes.alignment}} 
            className={this.props.fromTemplate ? "image-item-container-template" : "image-item-container"}
          >
            <div onClick={() => this.handleOpenMedia(0)} className="file-image-preview-image">
              <img
                src={(this.props.item.attributes.image!=undefined)?(this.props.item.attributes.image.link):(Math.random())}
                style={{
                  height: `${this.state.height}px`,
                  transform: `rotate(${this.props.item.attributes.image!=undefined?this.props.item.attributes.image.coordenada:0}deg)`,
                }}
                //className="file-image-preview"
              />
            </div>
            <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
              {`${this.props.item.attributes.title}`}
            </Typography>
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
        <MediaPlayer
          index={this.state.index}
          openMedia={this.state.openMedia}
          mediaItems={[this.props.item]}
          handleCloseMedia={this.handleCloseMedia.bind(this)}
          language={this.props.language}
        />
      </div>
      );
    }
  }
