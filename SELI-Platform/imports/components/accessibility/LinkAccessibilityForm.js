import React, {useState, useEffect} from 'react';
import A11YLink from './a11yLink';

export default function LinkA11Y(props) {
	//data variable
	const [link, setLink] = React.useState('');
	const [linkText, setLinkText] = React.useState('');

	//feedback
	const [linkError, setlinkError] = React.useState(true);
	const [linkTextError, setlinkTextError] = React.useState(true);
	
	const handleLinkOnChange = (event) =>{
		let value = event.target.value;
		setLink(value);
		setlinkError(linkIsValid(value));
	};

	function linkIsValid(value){
		let valid = true;

		if(value === '' || value === undefined)
			return false;

		let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
		return !urlRegex.test(value);
	}

	const handleLinkTextOnChange = (event)=>{
		let value = event.target.value;
		setLinkText(value);
		setlinkTextError(value === '' || value === undefined );
	};

	return (
		<React.Fragment>
			<section id='link'  className="form accessib-form">
				<A11YLink
					name='link'
				////link data////
					linkValue={link}
					linkError={linkError}
					handleLinkChange={handleLinkOnChange}
					//linkLabel={linkLabel} //default
					//linkPlacheholder={linkPlacheholder} //default
				////text link data ////
					text={linkText}
					//linkTextLabel={linkTextLabel} //default
					//linkTextPlacheholder={linkTextPlacheholder} //default
					textError={linkTextError}
					handleTextOnChange={handleLinkTextOnChange}
					linkTextStep='linkTextHelper'
					linkTextTip='The text of, or associated with, the link is intended to describe the purpose of the link. In cases where the link takes one to a document or a web application, the name of the document or web application would be sufficient to describe the purpose of the link (which is to take you to the document or web application)'
				/>
			</section>
		</React.Fragment>
	);
}