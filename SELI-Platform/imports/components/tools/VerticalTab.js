import React, {useState, useEffect, useCallback} from 'react';
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
import {VideoTextAltA11Y, VideoMediaCaptionsAltA11Y, VideoMediaSignLanguageA11Y, VideoMediaAudioDescriptioA11Y, VideoOthersA11Y, useDataField} from '../accessibility/VideoAccessibilityForm';
import AudioA11yForm, {useAudioDataField} from '../accessibility/AudioAccessibilityForm';
import A11YProgressFeedback from '../accessibility/a11yProgressFeedback';


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
		root: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper,
			display: 'flex',
		},
		tabs: {
			borderRight: `1px solid ${theme.palette.divider}`,
		},
		disabled:{
			opacity: 1,
		}
	}));


	export default function VerticalTabs(props) {
		const classes = useStyles();
		const [value, setValue] = React.useState(0);

		function handleTabChange(event, newValue) {
			setValue(newValue);
		}
		let indexTab = 0;
		let indexPanel = 0;

		const data = useData(props.contentTypeAdded);

		return (
			<div className={classes.root}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleTabChange}
					aria-label="Settings"
					className="vertical-tabs-container"
				>
					<Tab label="Content" {...a11yProps(indexTab++,props.contentTypeAdded)}/>
					<Tab
						label="Acessibility"
						{...a11yProps(indexTab++, props.contentTypeAdded)}
						disabled
						className="tabPanelSubhead"
					/>
					{
							props.contentTypeAdded === 'image' &&
						<Tab
							label="Text Alternatives"
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							/* Tab doesnt accept Fragment as child
							https://github.com/mui-org/material-ui/issues/14943
							*/
							// <React.Fragment>
							// <Tab> ...
							// <Tab> ...
							// </React.Fragment>
					}
					{
							props.contentTypeAdded === 'video' &&
						<Tab label="Text Alternatives"
							{...a11yProps(indexTab++, props.contentTypeAdded )}
						/>
					}
					{
							props.contentTypeAdded === 'video' &&
						<Tab
							label="Captions"
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' &&
						<Tab
							label="Audio Descriptions"
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' &&
						<Tab
							label="Sign Language"
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'video' &&
						<Tab
							label="Others"
							{...a11yProps(indexTab++, props.contentTypeAdded)}
						/>
					}
					{
							props.contentTypeAdded === 'audio' &&
						<Tab
							label="Text Alternatives"
							{...a11yProps(indexTab++)}
						/>
					}
					{
							//   <Tab label="A11y Text" {...a11yProps(1)} />
							// props.contentTypeAdded === 'text'&&


							// props.contentTypeAdded === 'link'&&
							//   <Tab label="A11y link" {...a11yProps(1)} />

							// props.contentTypeAdded === 'pdf'&&
							//   <Tab label="A11y pdf" {...a11yProps(1)} />

							// props.contentTypeAdded === 'compressed'&&
							//   <Tab label="A11y compressed" {...a11yProps(1)} />

							// props.contentTypeAdded === 'h5p'&&
							//   <Tab label="A11y h5p" {...a11yProps(1)} />

							// props.contentTypeAdded === 'quiz'&&
							//   <Tab label="A11y quiz" {...a11yProps(1)} />

							// props.contentTypeAdded === 'activity'&&
							//   <Tab label="A11y activity" {...a11yProps(1)} />

							// props.contentTypeAdded === 'embebed'&&
							//   <Tab label="A11y embebed" {...a11yProps(1)} />

							// props.contentTypeAdded === 'unity'&&
							//   <Tab label="A11y unity" {...a11yProps(1)} />
							// <Tab label={
							// 	<React.Fragment>
							// 		<A11YProgressFeedback a11yFields={data.isA11Y}/>
							// 	</React.Fragment>
							// } {...a11yProps(indexTab++,props.contentTypeAdded)} disabled className={classes.disabled}/>
					}
					<A11YProgressFeedback
						a11yFields={data.isA11Y}
						getAccessibilityPercetage={props.getAccessibilityPercetage.bind(this)}
						{...a11yProps(indexTab++, props.contentTypeAdded)}
					/>
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
							props.contentTypeAdded === 'video' ?
								<VideoItem
									item={props.item}
								/>
							:
							undefined
						}
						{
							props.contentTypeAdded === 'audio' ?
								<AudioItem
									item={props.item}
								/>
							:
							undefined
						}
					</TabPanel>

					<TabPanel value={value} index={indexPanel++}>
					</TabPanel>
					{
						props.contentTypeAdded === 'image' &&
						<React.Fragment>
							<TabPanel value={value} index={indexPanel++}>
								<ImageA11yForm data={{
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
								}}/>
							</TabPanel>
						</React.Fragment>
					}
					{
						props.contentTypeAdded === 'audio' &&
						<React.Fragment>
							<TabPanel value={value} index={indexPanel++}>
								<AudioA11yForm data={{
									handleInputOnChange:data.handleInputOnChange,
									handleLongDescriptionPosition:data.handleLongDescriptionPosition,
									dataField:data.dataField,
									shortDescriptionTip:data.shortDescriptionTip,
									longDescriptionTip:data.longDescriptionTip,
									iisA11Y:data.isA11Y,
								}}/>
							</TabPanel>
						</React.Fragment>
					}
					{
						// props.contentTypeAdded === 'text'&&
						// props.contentTypeAdded === 'link'&&
						// props.contentTypeAdded === 'pdf'&&
						// props.contentTypeAdded === 'compressed'&&
						// props.contentTypeAdded === 'h5p'&&
						// props.contentTypeAdded === 'quiz'&&
						// props.contentTypeAdded === 'activity'&&
						// props.contentTypeAdded === 'embebed'&&
						// props.contentTypeAdded === 'unity'&&
					}
					{
						props.contentTypeAdded === 'video' &&
						<React.Fragment>
							<TabPanel value={value} index={indexPanel++}>
								<VideoTextAltA11Y data={{
									handleInputOnChange: data.handleInputOnChange,
									dataField: data.dataField,
									shortDescriptionTip: data.shortDescriptionTip,
									longDescriptionTip: data.longDescriptionTip,
								}}/>
							</TabPanel>
							<TabPanel value={value} index={indexPanel++}>
								<VideoMediaCaptionsAltA11Y data={{
									handleRadioButtonOnChange: data.handleRadioButtonOnChange,
									dataField: data.dataField,
									captionsTip: data.captionsTip,
								}}/>
							</TabPanel>
							<TabPanel value={value} index={indexPanel++}>
								<VideoMediaAudioDescriptioA11Y data={{
									handleRadioButtonOnChange: data.handleRadioButtonOnChange,
									dataField: data.dataField,
									audioDescriptionTip: data.audioDescriptionTip,
									audioDescriptionRequiredTip: data.audioDescriptionRequiredTip,
									disabled_necAudioDesc: data.disabled_necAudioDesc,
									disabled_uploadAudioDesc: data.disabled_uploadAudioDesc,
								}}/>
							</TabPanel>
							<TabPanel value={value} index={indexPanel++}>
								<VideoMediaSignLanguageA11Y data={{
									handleRadioButtonOnChange: data.handleRadioButtonOnChange,
									dataField: data.dataField,
									signLanguageTip: data.signLanguageTip
								}}/>
							</TabPanel>
							<TabPanel value={value} index={indexPanel++}>
								<VideoOthersA11Y data={{
									handleRadioButtonOnChange: data.handleRadioButtonOnChange,
									dataField: data.dataField,
									seizuresTip: data.seizuresTip
								}}/>
							</TabPanel>
						</React.Fragment>
					}
					<TabPanel value={value} index={indexPanel++}>
					</TabPanel>
				</div>
			</div>
			);
		}
		export const useData = (type) => {
			if(type === 'video')
			return useDataField();
			if(type === 'image')
			return useImageDataField();
			if(type === 'audio')
			return useAudioDataField();
			return  {
				isA11Y: [],
			};
		};
