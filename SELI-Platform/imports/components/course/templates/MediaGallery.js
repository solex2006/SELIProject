import React from 'react';
import Grid from "@material-ui/core/Grid";

export default class MediaGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="template-media-gallery">
        <Grid
					className='template-image-gallery'
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
						<span className="template-title-gallery" id="gallery-title">
              {this.props.contentCode === "image" ? "Image gallery" : "Video gallery"}
						</span>
						<details id="gallery-description">
							<summary id="gallery-instructions">Instructions</summary>
							<ul>
								<li>
									arrows key <kbd>left</kbd> and <kbd>right</kbd> rovers in
									gallery's image
								</li>
								<li>
									<kbd>Enter</kbd> key opens image in full width.
								</li>

								<li>
									Image's long description, if configured by instructor, will be
									displayed in full width option.
								</li>
							</ul>
						</details>
					</Grid>
					{this.props.contentItems.map((tile, index) => (
						<Grid item >
              {  
                this.props.contentCode === "image" ?
                  <div>
                    <img src={tile.attributes.image.link} />
                  </div>
                :
                  undefined
              }
						</Grid>
					))}
				</Grid>
      </div>
    );
  }
}
