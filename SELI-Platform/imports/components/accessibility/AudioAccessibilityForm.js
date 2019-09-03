import React, {useState, useEffect} from 'react';
// upload componenets
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import FileUpload from '../files/FileUpload';
//a11y componentes
import EditorA11Y from '../tools/a11yEditor';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import A11YLongDescription from './a11yLongDescription';


export default function AudioA11Y(props) {

	//data variable
	const [longDescription, setLongDescription] = React.useState('');
	const [longDescriptionPosition, setLongDescriptionPosition] = React.useState('bottom');

	//feedback
	const [longDescriptionError, setLongDescriptionError] = React.useState(true);
	const [longDescriptionTip, setLongDescriptionTip] = React.useState('Creating a document that tells the same story and presents the same information as the prerecorded audio-only content. Includes all of the important dialogue and as well as descriptions of background sounds etc. that are part of the story.');
	
	function handleLongDescriptionOnChange (value){
		setLongDescription(value);
		setLongDescriptionError(value === '');
	}

	function LongDescriptionHasError(value =''){
		let err = value === '';
		setLongDescriptionError(err);
		return err;
	}

	function handleLongDescriptionPosition(value = 'bottom'){
		value = value === ''? 'bottom' : value;
		setLongDescriptionPosition(value);
	}

	return (
		<React.Fragment>
			<section id='audio-text-alternatives'  className="form accessib-form">
				<header><h3>Text alternatives to audio content</h3></header>
				<A11YLongDescription
					handleOnChange={handleLongDescriptionOnChange}
					handleError={LongDescriptionHasError}
					error={longDescriptionError}
					value={longDescription}
					name="audioOnly"
					label="Transcription"
					//ariaLabelledBy
					//ariaDescribedBy
					//editorData
					placeholder="Audio transcription"
					required={true}
					tip={
						<React.Fragment>
							{longDescriptionTip}
							<FileUpload size='small'
								parentId={props.parentId + 'transciption-accessibility-pdf-file'}
								accept=".pdf"
								label="Alternativaly, you can upload transcription as pdf file."
								uploadedTitle="Transciption (pdf)"
								icon="pdf-g.svg"
								collection={CourseFilesCollection}
								removeFunction='RemoveCourseFile'
								type='accessibility-pdf-trasncription'
								preview={false}
								dowload={false}
								open={true}
								delete={true}
								showIcon={true}
								accessibilitySettings={false}
								//showControlMessage={props.showControlMessage.bind(this)}
								// resetFile={resetTranscriptionFile.bind(this)}
								// getFileInformation={getTranscriptionFileInfo.bind(this)}
								// removeFileInformation={removeTranscriptionFile.bind(this)}
								// showAccesibilityForm={undefined}
							/>
						</React.Fragment>
					} 
					position={longDescriptionPosition}
					handlePosition={handleLongDescriptionPosition}
					positionLabel='Text position relative to audio player'
				/>
			</section>
		</React.Fragment>
	);
}