import React from 'react';
import VideoThumbnail from 'react-video-thumbnail';
import ReactPlayer from 'react-player';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Grid from "@material-ui/core/Grid";
import MediaPlayer from '../../tools/MediaPlayer';

export default class MediaGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMedia: false,
      canFocus: "-1",
      index: 0
    }
	}
	
	handleOpenMedia = () => {
		this.setState({
      openMedia: true,
    });
  }

  handleOpenMediaClick = (index) => {
		this.setState({
      index: index
    }, () => {
      this.handleOpenMedia();
    });
  }

  handleOpenMediaKey = (event) => {
    if (event.which == 13 || event.keyCode == 13 ||
        event.which == 32 || event.keyCode == 32) {
      this.handleOpenMedia();
    } else  if (event.which == 37 || event.keyCode == 37) {
      this.setState({canFocus: "0"}, () => {
        if (document.activeElement === document.getElementById("child-gallery")) {
          document.getElementById(this.props.contentItems[this.props.contentItems.length - 1].id).focus();
        } else {
          if (this.state.index > 0) {
            this.setState({ index: this.state.index - 1 }, () => { 
              document.getElementById(this.props.contentItems[this.state.index].id).focus();
            });
          } else {
            this.setState({ index: this.props.contentItems.length - 1 }, () => { 
              document.getElementById(this.props.contentItems[this.state.index].id).focus();
            });
          }
        }
      })
    } else if (event.which == 39 || event.keyCode == 39) {
      this.setState({canFocus: "0"}, () => {
        if (document.activeElement === document.getElementById("child-gallery")) {
          document.getElementById(this.props.contentItems[0].id).focus();
        } else {
          if (this.state.index < this.props.contentItems.length - 1) {
            this.setState({ index: this.state.index + 1 }, () => {
              document.getElementById(this.props.contentItems[this.state.index].id).focus();
            });
          } else {
            this.setState({ index: 0 }, () => { 
              document.getElementById(this.props.contentItems[this.state.index].id).focus();
            });
          }
        }
      })
    } else if (event.which == 9 || event.keyCode == 9) {
      this.setState({canFocus: "-1"})
    }
  }
  
  handleCloseMedia = () => {
    this.setState({
      openMedia: false,
    });
  }

  onClick = () => {}
  
  imageItem = (tile) => {
    const a11y = tile.attributes.accessibility;
    var altText = "";
    if (a11y.dataField && a11y.dataField.shortDescription !== "") altText = a11y.dataField.shortDescription
    else altText = tile.attributes.title;
    return (
      <img
        id={tile.id}
        tabIndex={this.state.canFocus}
        className="template-image-gallery-preview"
        alt={altText}
        src={tile.attributes.image.link}
      />
    )
  }

  videoItem = (tile) => {
    const a11y = tile.attributes.accessibility;
    var altText = "";
    if (a11y.dataField && a11y.dataField.shortDescription !== "") altText = a11y.dataField.shortDescription
    else altText = tile.attributes.title;
    return (
      <React.Fragment>
        <PlayCircleOutlineIcon className="template-play-icon" />
        <div
          id={tile.id}
          tabIndex={this.state.canFocus}
          className="template-video-gallery-preview"
          aria-label={altText}
        >
          {
            tile.attributes.source === "upload" ?
              <VideoThumbnail
                tabIndex="-1"
                videoUrl={tile.attributes.video.link}
                //thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                width={300}
                height={268}
              />
            :
              <React.Fragment>
                <ReactPlayer
                  url={tile.attributes.video.link}
                  className="template-video-preview-external"
                  controls={false}
                  light={true}
                  onClick={this.onClick}
                  playIcon={null}
                />
                <div className="template-video-preview-external-overlay"/>
              </React.Fragment>
          }
        </div>
      </React.Fragment>
    )
  }

  render() {
    return(
      <div className="template-media-gallery">
        <div className="template-title-gallery" id={`${this.props.contentCode}-gallery-title`}>
          {this.props.contentCode === "image" ? this.props.language.imageGallery : this.props.language.videoGallery}
        </div>
        <details className="template-instructions-gallery" id={`${this.props.contentCode}-gallery-description`}>
          <summary id="gallery-instructions">{this.props.language.instructions}</summary>
          {
            this.props.contentCode === "image" ?
              <ul>
                <li>
                  <div dangerouslySetInnerHTML={{__html: this.props.language.imageGalleryLabel0}}/>
                </li>
                <li>
                  <div dangerouslySetInnerHTML={{__html: this.props.language.imageGalleryLabel1}}/>
                </li>
                <li>
                  {this.props.language.imageGalleryLabel2}
                </li>
              </ul>
            :
              <ul>
                <li>
                  <div dangerouslySetInnerHTML={{__html: this.props.language.videoGalleryLabel0}}/>
                </li>
                <li>
                  <div dangerouslySetInnerHTML={{__html: this.props.language.videoGalleryLabel1}}/>
                </li>
                <li>
                  {this.props.language.videoGalleryLabel2}
                  <ul>
                    <li>
                      {this.props.language.Captions}
                    </li>
                    <li>
                      {this.props.language.audioDescription}
                    </li>
                    <li>
                      {this.props.language.longDescription_a11y_label_audio}
                    </li>
                    <li>
                      {this.props.language.signLanguageInterpreter}
                    </li>
                  </ul>
                </li>
              </ul>
          }
        </details>
        <Grid
          id="child-gallery"
					className='template-child-gallery'
					container
					spacing={2}
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					tabIndex={0}
					aria-labelledby={`${this.props.contentCode}-gallery-title`}
					aria-describedby={`${this.props.contentCode}-gallery-description`}
          role="grid"
          onKeyDown={this.handleOpenMediaKey}
				>
					{this.props.contentItems.map((tile, index) => (
						<Grid item >
							<figure
                //role="group"
								className="template-paper-gallery-preview"
                onClick={() => this.handleOpenMediaClick(index)}
							>
								{  
									this.props.contentCode === "image" ?
										this.imageItem(tile)
									:
										this.videoItem(tile)
								}
								<figcaption className="template-paper-title-gallery-preview">
									{tile.attributes.title}
								</figcaption>
							</figure>
						</Grid>
					))}
				</Grid>
        <MediaPlayer
          index={this.state.index}
          openMedia={this.state.openMedia}
          mediaItems={this.props.contentItems}
          handleCloseMedia={this.handleCloseMedia.bind(this)}
          language={this.props.language}
        />
      </div>
    );
  }
}
