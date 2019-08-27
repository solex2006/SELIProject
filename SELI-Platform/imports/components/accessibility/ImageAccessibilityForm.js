import React from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// form componenets
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
// feedback
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import PublishIcon from '@material-ui/icons/Publish';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import Help from '../tools/Help';

export default class ImageAccessibilityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
        	//attributes of Image
        	imagePurpose: 'info',
        	shortDescription: '',
        	longDescription:'',

            //attributes of Accessibility validation
            shortDescriptionError: true,
            longDescriptionError: true,    

            //attributes of page
            displayAltGroup: 'initial', 
            displayAltLong: 'none', 
            imagePurposeLabel:'Informative',
            imagePurposeTip:this.getImagePurposeTip("info"),
            shortDescriptionTip: this.getShortDescriptionTip("info"),
        	longDescriptionTip:this.getLongDescriptionTip("info"),
        };
    }

    //FIX update of textArea values (front) by code
    handleOnChange = name => event => {	
    	const { name, value } = event.target;
 				console.log("[1] state: " +this.state.longDescription);
         			
 		this.setState({
 			[name]: value},
 			() => {
 			if(name === "imagePurpose"){
 				console.log("[2] state: " +this.state.longDescription);
				const toogleShort = value === "deco";
				const toogleLong =  toogleShort || value === "info" || value === "txt";

				this.setState({
					"displayAltGroup" : toogleShort ? "none" : "initial",
					"displayAltLong" : toogleLong ? "none" : "initial"});
				
				if(toogleShort){
					this.setState({"shortDescription" : ""});
				}

				if(toogleLong){
					this.setState({"longDescription" : ""});
				}

			 	this.setState({
			 		"imagePurposeTip": this.getImagePurposeTip(value),
					"imagePurposeLabel": this.getImagePurposeLabel(value),
					"shortDescriptionTip": this.getShortDescriptionTip(value),
					"longDescriptionTip": this.getLongDescriptionTip(value),
		 		});
 				console.log("[3] state: " +this.state.longDescription);

			}
			else
			{
				this.setState({
					[name+"Error"]: value === "",
				});
			}
 		});
	}

	getImagePurposeLabel(purpose =""){
		if(purpose === "")
			purpose = this.state.imagePurpose;

		switch(purpose){
			case 'info':
				return "Informative Images";
			case 'deco':
			  	return "Decorative Images";
			case 'txt':
				return "Images of Texts";
			case 'cplx':
			  	return "Complex Images";
			default:
			  return;
		}
	}

	getImagePurposeTip(purpose =""){
		if(purpose === "")
			purpose = this.state.imagePurpose;

		switch(purpose){
			case 'info':
			  	return "Images that graphically represent SIMPLE concepts and information, typically pictures, photos, and illustrations.";
			case 'deco':
			  	return "Decorative images don’t add information to the content of a page.";
			case 'txt':
			  	return "Readable text presented within an image. If the image is not a logo, avoid text in images, because genuine text is much more flexible than images: It can be resized without losing clarity, and background and text colors can be modified to suit the reading preferences of users";
			case 'cplx':
			  	return "Complex images such as graphs, charts, diagrams, ilustration, maps. Complex images contain substantial information – more than can be conveyed in a short phrase or sentence.";
			default:
			  return;
		}
	}

	getShortDescriptionTip(purpose =""){
		if(purpose === "")
			purpose = this.state.imagePurpose;

		switch(purpose){
			case 'info':
			  	return "Creat at least a short description conveying the essential information presented by the image, like meaning or content that is displayed visually, which typically isn’t a literal description of the image.";
			case 'txt':
			  	return "Should contain the same words as in the image.";
			case 'cplx':
			  	return "Creat a short description to identify and provide a brief overview of the information."
			default:
			  return;
		}
	}
	
	getLongDescriptionTip(purpose =""){
		if(purpose === "")
			purpose = this.state.imagePurpose;

		switch(purpose){
			case 'cplx':
			  	return "Provide a full-text equivalent of the data or information provided in the image as the text alternative. . As a result, it is possible to remove the image content and replace it with the text alternative and no functionality or information would be lost.";
			default:
			  return;
		}
	}

    render() {

        /*
	  		Every <img> you add to your site needs to have an alt attribute. If the image is informational, set the alt equal to a descriptive alternative for that image.
			
			If the image is decorative or redundant to adjacent text, set alt="", which conveys to assistive technology users that the image isn’t necessary for understanding the page.
			Avoid using generic strings like photo, image, or icon as alt values, as they don’t communicate valuable content to the user. Be as descriptive as possible.
			
			Make sure any text in images of text is at least 14 points and has good contrast with the background.

			longdesc=string	
			A hyperlink to a detailed description of an image.
			Possible values:

			An id to another element
			An absolute URL - points to another web site (like longdesc="http://www.example.com/description.txt")
			A relative URL - points to a file within a web site (like longdesc="description.txt")
		*/
         
		return(
			<aside role="dialog">
				<header className="accessibility-header-row">
					<h2>Accessibility settings for image content</h2>
				</header>
				
				<section id="image-feedback">
					Fields that are validated for acessibility are marked with the accessibility icon <AccessibilityIcon className="accessib-valid"
					/> 
					<br />Fields that are madatory are marked with an <strong>*</strong> 
				</section>

				<section id="image-decoration" className="accessib-form">
					<header><h3>
					Function of image</h3>
					</header>
					<FormControl component="fieldset">
				 	<FormLabel component="legend" id="image-purpose-label">Image could be configured based on the purpose of the image</FormLabel>
              		<RadioGroup name="imagePurpose" 
						id="image-purpose"
						aria-labelledby="image-purpose-label" 
						aria-describedby="image-purpose-exp"
						value={this.state.imagePurpose}  
						onChange={this.handleOnChange()} 
						row>
						<FormControlLabel
							name="imagePurpose"
							id="image-purpose-info"
							label="Informative"
							value="info"
							control={<Radio color="primary" />}
							labelPlacement="start"
						/>
						<FormControlLabel
							name="imagePurpose"
							id="image-purpose-deco"
							label="Decorative"
							value="deco"
							control={<Radio color="primary" />}
							labelPlacement="start"
						/>
						<FormControlLabel
							name="imagePurpose"
							id="image-purpose-txt"
							label="Image of text"
							value="txt"
							control={<Radio color="primary" />}
							labelPlacement="start"
						/>
						<FormControlLabel
							name="imagePurpose"
							id="image-purpose-cplx"
							label="Complex images"
							value="cplx"
							control={<Radio color="primary" />}
							labelPlacement="start"
						/>
               		</RadioGroup>
      				<AccessibilityHelp id="image-purpose" name="imagePurpose" error={false} tip={this.state.imagePurposeTip} step={"imagePurposeHelper_"+this.state.imagePurpose} stepLabel={this.state.imagePurposeLabel} guide=""/>
					</FormControl>
				</section>

				<section id="image-text-alternatives"  className="form accessib-form" style={{'display':this.state.displayAltGroup}}>
					<header><h3>
						Text alternatives to image content</h3>
					</header>
					<Grid container spacing={1} direction="column" justify="flex-start">
						<Grid item id="short-description-container" role="grid">
							<TextField id="short-description-input"
								name="shortDescription"
								label="Short description"
								aria-describedby="short-description-input-helper-text"
								placeholder="Content identification"
								maxLength="100"
								margin="normal"
								multiline
								fullWidth
								required
								rows="2"
								wrap="hard"
								variant="outlined"    
								value={this.state.shortDescrinption} 
								onChange={this.handleOnChange()}
								error={this.state.shortDescriptionError}
							/>
							<AccessibilityHelp id="short-description-input" name="image-shortDescription" error={this.state.shortDescriptionError} step={"shortAltHelper_"+this.state.imagePurpose} stepLabel={this.state.shortPurposeLabel} tip={this.state.shortDescriptionTip} />

                  		</Grid>
						<Grid  item id="long-description-container" role="grid" style={{"display" : this.state.displayAltLong}}
						>
							<TextField id="long-description-input"
								name="longDescription"
								label="Transcription"
								aria-describedby="long-description-exp"
								placeholder="Video transcription"
								margin="normal"
								variant="outlined"
								multiline
								fullWidth
								required
								multiline
								rows="5"
								wrap="hard"
								variant="outlined"
								value={this.state.longDescrinption} 
								onChange={this.handleOnChange()}
								error={this.state.longDescriptionError}
							/>
							<AccessibilityHelp id="long-description-input" name="image-longDescription" error={this.state.longDescriptionError} step={"longAltHelper_"+this.state.imagePurpose} stepLabel={this.state.longPurposeLabel} tip={this.state.longDescriptionTip} />
						</Grid>
					</Grid>
				</section>

			</aside>
		);
	}
}