import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
/* Content Forms */
import AudioItem from '../accessibility/previews/AudioItem';
import VideoItem from '../accessibility/previews/VideoItem';
import ImageItem from '../accessibility/previews/ImageItem';
/* a11y content forms */
import ImageA11yForm, {useImageDataField} from '../accessibility/ImageAccessibilityForm';
import {QuizAccessibility,QuizAccessibilityExtendedTime,QuizAccessibilityWarningTime,useQuizDataField } from '../accessibility/QuizAccessibilityForm';
import {PdfAccessibilitytextContent,PdfAccessibilityContent,PdfAccessibilityForm,PdfAccessibilityStructures,PdfAccessibilityNavigation,PdfAccessibilityText,usePdfDataField } from '../accessibility/PdfAccessibilityForm';
import {VideoTextAltA11Y, VideoMediaCaptionsAltA11Y, VideoMediaSignLanguageA11Y, VideoMediaAudioDescriptioA11Y, VideoOthersA11Y, useDataField} from '../accessibility/VideoAccessibilityForm';
import AudioA11yForm, {useAudioDataField, AudioA11YCaptions ,VideoSignalA11Y} from '../accessibility/AudioAccessibilityForm';
import A11YProgressFeedback from '../accessibility/a11yProgressFeedback';
import Fab from '@material-ui/core/Fab';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import Tooltip from '@material-ui/core/Tooltip';




function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={'vertical-tabpanel-' + { index }}
			aria-labelledby={'vertical-tab-' + { index }}
			{...other}
		>
			<Box p={3}>
				{children}
			</Box>
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index, parent) {
	return {
		id: 'vertical-tab-'+{parent}+'-'+{index},
		'aria-controls': 'vertical-tabpanel-'+{parent}+'-'+{index},
	};
}

const useStyles = makeStyles(theme => ({
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	disabled:{
		opacity: 1,
	}
}));

export const useData = (language, type, item, itemAll) => {

	if(type === 'video')
		return useDataField({language, item});
	if(type === 'image')
		return useImageDataField({language, item});
	if(type === 'audio')
		return useAudioDataField({language, item});
	if(type === 'quiz')
		return useQuizDataField({language, item});
	if(type === 'pdf')
		return usePdfDataField({language, itemAll});
	return  {
		isA11Y: [],
	};
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function VerticalTabs(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [support, setSupport] = React.useState([]);
	const [width, height] = useWindowSize();
	//const [captionValidator, setCaptionValidator] = React.useState('');

	function handleTabChange(event, newValue) {
		setValue(newValue);
	}

	useEffect(() => {
		console.log("props.support",props.support)
		let supportAux = [];
		props.support.map((option) => {
			supportAux.push(option)
		})
		setSupport(supportAux);
  }, [])

	let indexTab = 0;
	let indexPanel = 0;
	console.log("*******data and props*********", props)
	let data = useData(props.language, props.contentTypeAdded, props.item.accessibility, props.item);
	

	let dataToSend = {
		dataField: data.dataField,
		isA11Y: data.isA11Y,
	}
	
	return (
		<div>
			<div className="accessibility-main-container">
				<Tabs
					orientation={width >= 1080 ? "vertical" : "horizontal"}
					variant="scrollable"
					value={value}
					onChange={handleTabChange}
					aria-label="Settings"
					className="vertical-tabs-container"
					color="secondary"
					textColor="secondary"
				>
					<Tab label={props.language.content} {...a11yProps(indexTab++,props.contentTypeAdded)}/>
				
					{
							props.contentTypeAdded === 'image' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.textAlternatives}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'quiz' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.notime}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'quiz' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.extendedTime}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'quiz' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.warningTime}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab label={props.language.textAlternatives}
							{...a11yProps(indexTab++, props.contentTypeAdded )}
						/>
					}
					{
							props.contentTypeAdded === 'video' && support.some(object => ["Cognitive","Hearing"].includes(object)) &&
						<Tab
							label={props.language.Captions}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' && support.some(object => ["Cognitive","Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.audioDescription}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' && support.some(object => ["Hearing","Cognitive"].includes(object)) &&
						<Tab
							label={props.language.signLanguage}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.other}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					{
							props.contentTypeAdded === 'pdf' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.textAlternatives}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					{
							props.contentTypeAdded === 'pdf' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.navigation}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					{
							props.contentTypeAdded === 'pdf' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.Structures}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					{
							props.contentTypeAdded === 'pdf' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.Form}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					{
							props.contentTypeAdded === 'pdf' && support.some(object => ["Cognitive"].includes(object)) &&
						<Tab
							label={props.language.TextContent}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> 
					}
					
					
					{
							/* props.contentTypeAdded === 'audio' &&
						<Tab
							label={props.language.signLanguage}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/> */
					}
					
					{
							props.contentTypeAdded === 'audio' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.textAlternatives}
							{...a11yProps(indexTab++)}
						/>
					}
					{
							/* props.contentTypeAdded === 'audio' && support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
						<Tab
							label={props.language.audioTranscription}
							{...a11yProps(indexTab++)}
						/> */
					}
				</Tabs>
				<div className="accessibility-form-side-container">
					<TabPanel value={value} index={indexPanel++}>
						{
							props.contentTypeAdded === 'image' ?
								<ImageItem
									item={props.item}
								/>
							:
							undefined
						}
						{
							props.contentTypeAdded === 'quiz' ?
								<div>{props.language.quizAccessibility}</div>
							:
							undefined
						}
						{
							props.contentTypeAdded === 'pdf' ?
								<div>{props.language.quizAccessibility}</div>
							:
							undefined
						}
						
						{
							props.contentTypeAdded === 'video' ?
								<VideoItem
									item={props.item}
									language={props.language}
								/>
							:
							undefined
						}
						{
							props.contentTypeAdded === 'audio' ?
								<AudioItem
									item={props.item}
									language={props.language}
								/>
							:
							undefined
						}
						
					</TabPanel>
				
					{
						props.contentTypeAdded === 'image' &&
							<React.Fragment>
								{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<ImageA11yForm
											data={{
												editorReuse:data.editorReuse,
												handleInputOnChange:data.handleInputOnChange,
												handleImagePurposeOnChange:data.handleImagePurposeOnChange,
												handleLongDescriptionPosition:data.handleLongDescriptionPosition,
												dataField:data.dataField,
												shortDescriptionTip:data.shortDescriptionTip,
												longDescriptionTip:data.longDescriptionTip,
												imagePurposeTip:data.imagePurposeTip,
												imagePurposeLabel:data.imagePurposeLabel,
												displayAltGroup:data.displayAltGroup,
												displayAltLong:data.displayAltLong,
												isA11Y:data.isA11Y,
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}
							</React.Fragment>
					}
					{
						props.contentTypeAdded === 'quiz' &&
						<React.Fragment>
								{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<QuizAccessibility
											data={{
												myFormatminutes:data.myFormatminutes,
												handleChange:data.handleChange , 
												handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
												handleRadioButtonOnChange: data.handleRadioButtonOnChange,
												dataField: data.dataField,
												noTimeTip:data.noTimeTip,
												extendedTimeTip:data.extendedTimeTip,
												alertMomentTip:data.alertMomentTip
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}


									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<QuizAccessibilityExtendedTime
											data={{
												myFormatminutes:data.myFormatminutes,
												handleChange:data.handleChange , 
												handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
												handleRadioButtonOnChange: data.handleRadioButtonOnChange,
												dataField: data.dataField,
												noTimeTip:data.noTimeTip,
												extendedTimeTip:data.extendedTimeTip,
												alertMomentTip:data.alertMomentTip
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}


									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<QuizAccessibilityWarningTime
											data={{
												myFormatminutes:data.myFormatminutes,
												handleChange:data.handleChange, 
												handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
												handleRadioButtonOnChange: data.handleRadioButtonOnChange,
												dataField: data.dataField,
												noTimeTip:data.noTimeTip,
												extendedTimeTip:data.extendedTimeTip,
       											alertMomentTip:data.alertMomentTip
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}
									
											
						</React.Fragment>
								
					}
					{
						props.contentTypeAdded === 'pdf' &&
						<React.Fragment>
								{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<PdfAccessibilityText
											data={{
												hasImageTip:data.hasImageTip,
												hasAltTip:data.hasAltTip,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												disabled_image:data.disabled_image,
												dataField:data.dataField
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}
									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<PdfAccessibilityNavigation
											data={{
												hasBookmarksTip:data.hasBookmarksTip,
												isBookmarksCorrectTip:data.isBookmarksCorrectTip,
												screenReaderTip:data.screenReaderTip,
      										focusOrderTip:data.focusOrderTip,
												disabled_Bookmarks:data.disabled_Bookmarks,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												dataField:data.dataField,
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}	
									
									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<PdfAccessibilityStructures
											data={{
												hasTitleTip:data.hasTitleTip,
												hasNumberingTip:data.hasNumberingTip,
												hasLanguageTip:data.hasLanguageTip,
												hasLanguagePartTip:data.hasLanguagePartTip,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												dataField:data.dataField,
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}
									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<PdfAccessibilityForm
											data={{
												hasFormTip:data.hasFormTip,
												hasRequiredFieldsTip:data.hasRequiredFieldsTip,
												isRequiredFieldsTip:data.isRequiredFieldsTip,
												hasLabelsTip:data.hasLabelsTip,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												disabled_Form:data.disabled_Form,
												disabled_hasRequiredFields:data.disabled_hasRequiredFields,
												dataField:data.dataField,
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}

									{support.some(object => ["Cognitive", "Hearing", "Speech"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<PdfAccessibilitytextContent
											data={{
												isTableTip:data.isTableTip,
												isListTip:data.isListTip,
												isAbbreviationTip:data.isAbbreviationTip,
												isHeadingsTip:data.isHeadingsTip,
												isLinkTip:data.isLinkTip,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												dataField:data.dataField,
											}}
											item={props.item}
											language={props.language}
										/>
									</TabPanel>}
									
							
						</React.Fragment>
					}
					{
						props.contentTypeAdded === 'audio' &&
								<React.Fragment>
									{support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
										<TabPanel value={value} index={indexPanel++}>
											<AudioA11yForm data={{
												captionsTip:data.captionsTip,
												handleInputOnChange:data.handleInputOnChange,
												handleLongDescriptionPosition:data.handleLongDescriptionPosition,
												dataField:data.dataField,
												shortDescriptionTip:data.shortDescriptionTip,
												longDescriptionTip:data.longDescriptionTip,
												iisA11Y:data.isA11Y,
											}}
											language={props.language}
											/>
										</TabPanel>}

										{/* support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
										<TabPanel value={value} index={indexPanel++}>
											<AudioA11YCaptions data={{
												captionsTip:data.captionsTip,
												handleRadioButtonOnChange:data.handleRadioButtonOnChange,
												changeText:data.changeText,
												addTranscription:data.addTranscription,
												handleSubmit:data.handleSubmit,
												remove:data.remove,
												time:data.time,
												handleInputOnChange:data.handleInputOnChange,
												handleLongDescriptionPosition:data.handleLongDescriptionPosition,
												dataField:data.dataField,
												shortDescriptionTip:data.shortDescriptionTip,
												longDescriptionTip:data.longDescriptionTip,
												iisA11Y:data.isA11Y,
											}}
											language={props.language}
											/>
										</TabPanel> */}


										
									
								</React.Fragment>
					}
					

					{
						props.contentTypeAdded === 'video' &&
							<React.Fragment>
								{support.some(object => ["Cognitive", "Hearing", "Speech","Visual"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<VideoTextAltA11Y data={{
											handleInputOnChange: data.handleInputOnChange,
											dataField: data.dataField,
											shortDescriptionTip: data.shortDescriptionTip,
											longDescriptionTip: data.longDescriptionTip,
										}}
										language={props.language}/>
									</TabPanel>}
								{support.some(object => ["Cognitive","Hearing"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<VideoMediaCaptionsAltA11Y data={{
											handleRadioButtonOnChange: data.handleRadioButtonOnChange,
											handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
											dataField: data.dataField,
											captionsTip: data.captionsTip,
											captionValidator: data.captionValidator
										}}
										handleControlMessage={props.handleControlMessage.bind(this)}
										language={props.language}/>
									</TabPanel>}
								{support.some(object => ["Cognitive","Speech","Visual"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<VideoMediaAudioDescriptioA11Y data={{
											handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
											handleRadioButtonOnChange: data.handleRadioButtonOnChange,
											dataField: data.dataField,
											audioDescriptionTip: data.audioDescriptionTip,
											audioDescriptionRequiredTip: data.audioDescriptionRequiredTip,
											disabled_necAudioDesc: data.disabled_necAudioDesc,
											disabled_uploadAudioDesc: data.disabled_uploadAudioDesc,
										}}
										language={props.language}/>
									</TabPanel>}
								{support.some(object => ["Hearing","Cognitive"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<VideoMediaSignLanguageA11Y data={{
											handleRadioButtonOnChange: data.handleRadioButtonOnChange,
											dataField: data.dataField,
											handleRadioButtonOnChangeValidator: data.handleRadioButtonOnChangeValidator,
											signLanguageTip: data.signLanguageTip
										}}
										language={props.language}/>
									</TabPanel>}
								 {support.some(object => ["Cognitive"].includes(object)) &&
									<TabPanel value={value} index={indexPanel++}>
										<VideoOthersA11Y data={{
											handleRadioButtonOnChange: data.handleRadioButtonOnChange,
											dataField: data.dataField,
											seizuresTip: data.seizuresTip
										}}
										language={props.language}/>
									</TabPanel>} 
							</React.Fragment>
					}
					<TabPanel value={value} index={indexPanel++}>
					</TabPanel>
				</div>
			</div>
			<div className="dialog-actions-container">
				{
					data.isA11Y.length > 0 ? 
						<A11YProgressFeedback
							a11yFields={data.isA11Y}
							getAccessibilityPercentage={props.getAccessibilityPercentage.bind(this)}
							{...a11yProps(indexTab++, props.contentTypeAdded)}
							data={{
								handleInputOnChange:data.handleInputOnChange,
								handleImagePurposeOnChange:data.handleImagePurposeOnChange,
								handleLongDescriptionPosition:data.handleLongDescriptionPosition,
								dataField:data.dataField,
								shortDescriptionTip:data.shortDescriptionTip,
								longDescriptionTip:data.longDescriptionTip,
								imagePurposeTip:data.imagePurposeTip,
								imagePurposeLabel:data.imagePurposeLabel,
								displayAltGroup:data.displayAltGroup,
								displayAltLong:data.displayAltLong,
								isA11Y:data.isA11Y,
							}}
							item={props.item}
							language={props.language}
						/>
					: undefined
				}
				<Tooltip title={props.language.setAccessibilityConf}>
					<Fab onClick={() => props.setContentAccessibilityData(dataToSend)} aria-label={props.language.setAccessibilityConf} className="dialog-fab" color="primary">
						<AccessibilityNewIcon/>
					</Fab>
				</Tooltip>
			</div>
	</div>
	);
}