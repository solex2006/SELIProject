import React from 'react';
import Paper from '@material-ui/core/Paper';
import VideoThumbnail from 'react-video-thumbnail';
import ReactPlayer from 'react-player';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Grid from "@material-ui/core/Grid";

export default class MediaGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
	}
	
	openFullScreen = (media) => {
		if (this.props.openMedia) this.props.openMedia(media);
	}

	onClick = () => {}

  render() {
    return(
      <div className="template-media-gallery">
        <Grid
					className='template-child-gallery'
					container
					spacing={2}
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					tabIndex={0}
					aria-labelledby="gallery-title"
					aria-describedby="gallery-description"
					role="grid"
				>
					<Grid item xs={12} lg={12}>
						<div className="template-title-gallery" id="gallery-title">
              {this.props.contentCode === "image" ? this.props.language.imageGallery : this.props.language.videoGallery}
						</div>
						<details className="template-instructions-gallery" id="gallery-description">
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
					</Grid>
					{this.props.contentItems.map((tile, index) => (
						<Grid item >
							<Paper
								tabIndex="0"
								elevation={8}
								className="template-paper-gallery-preview"
								onClick={() => this.openFullScreen(tile)}
								//onKeyDown={() => this.openFullScreen(tile)}
							>
								{  
									this.props.contentCode === "image" ?
										<div
											className="template-image-gallery-preview"
											style={{
												backgroundImage: `url(${tile.attributes.image.link})`,
												//transform: `rotate(${this.state.imageValue && this.state.imageValue.rotate ? this.state.imageValue.rotate : 0}deg)`,
											}}
										></div>
									:
										<React.Fragment>
											<PlayCircleOutlineIcon className="template-play-icon" />
											<div 
												className="template-video-gallery-preview"
											>
												{
													tile.attributes.source === "upload" ?
														<VideoThumbnail
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
								}
								<div className="template-paper-title-gallery-preview">
									{tile.attributes.title}
								</div>
							</Paper>
						</Grid>
					))}
				</Grid>
      </div>
    );
  }
}
