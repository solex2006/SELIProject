import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import A11YShortDescription from './a11yShortDescription';

export default function a11yLink(props) {

	const linkPlacheholder = props.linkPlaceholder === undefined ? 'https://link.to' : props.linkPlaceholder;
	const linkLabel = props.linkLabel === undefined ? 'URL' : props.linkLabel;
	const linkTextPlacheholder = props.linkTextPlaceholder === undefined ? 'Link purpose...' : props.linkTextPlaceholder;
	const linkTextLabel = props.linkTextLabel === undefined ? 'Text of the link' : props.linkTextLabel;
	const linkTextTip= props.linkTextTip === undefined? 'Text describing where the link is going' : props.linkTextTip;

	return (
		<React.Fragment>
			<Grid id={'link-input-container-'+props.name} container direction='column' spacing={1}>
				<Grid id={'link-input-url-container-'+props.name}>
					<TextField 
						name={'linkInputUrl'+props.name}
						id={'link-input-url-'+props.name}
						label={linkLabel}
						placeholder={linkPlacheholder}
						value={props.linkValue}
						required={true}
						error={props.linkError}
						onChange={(event) => {props.handleLinkChange(event);}}
						margin='normal'
						type='url'
						fullWidth={true}
					/>
				</Grid>
				
				<Grid item id={'link-input-text-container-'+props.name}>
					<A11YShortDescription 
						name={'linkInputText'+props.name}
						id={'link-input-Text-'+props.name}
						label={linkTextLabel}
						placeholder={linkTextPlacheholder}
						value={props.text}
						required={true}
						error={props.textError}
						handleOnChange={(event) => {props.handleTextOnChange(event);}}
						tip={linkTextTip} 
						step={props.linkTextStep}
						row={2}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}