import React, {useState, useEffect, useCallback} from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
// form componenets
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
//a11y components

import AccessibilityHelp from '../tools/AccessibilityHelp';
import FeedbackHelp from "../../components/course/feedback"
import TimePickers from '../content/TimePicker'


//PdfAccessibilitytextContent,PdfAccessibilityContent,PdfAccessibilityForm,
export function PdfAccessibilityText(props) {
	const {
      hasImageTip,
		hasAltTip,
      handleRadioButtonOnChange,
      disabled_image,
		dataField,
	} = props.data;

	return (
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-radiogroup-label'>{props.language.hasImage}</FormLabel>
					<RadioGroup
						id='audioDescr-radiogroup'
						aria-describedby='audioDescr-exp'
						aria-labelledby='audioDescr-radiogroup-label'
						name='audioDescription'
						row
						value={dataField.hasImage}
						onChange={handleRadioButtonOnChange}
					>
						<FormControlLabel
							id='audioDescr-yes'
							name='hasImage'
							label={props.language.yes}
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
							role='radio'
						/>
						<FormControlLabel
							id='audioDescr-no'
							name='hasImage'
							label={props.language.no}
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.hasImageError} tip={hasImageTip} />
				</FormControl>
			</Grid>	
			<Grid item>
			<FormControl component='fieldset' disabled={disabled_image}>
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasAlt}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='audioDescriptionRequired'
					value={dataField.hasAlt}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='hasAlt'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='hasAlt'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasImageError} tip={hasAltTip} />
				<FeedbackHelp
					language={props.language}
					validation={{
						error: false,
						errorMsg: "xxxx",
						errorType: "xxxxxtttt",
						a11y: null
					}}
					// tipMsg={language.appropriateOption}
					describedBy={"i05-helper-text"}
					stepHelp={{
						step: "textHelper",
						stepLabel: props.language.CourseSilabusHelp,
						helpsTips:props.language.sylabusTipsHelps
					}}
				/>
			</FormControl>
		</Grid>
      </Grid>
      
	);
}

export  function PdfAccessibilityNavigation(props) {
	const {
      focusOrderTip,
      screenReaderTip,
      hasBookmarksTip,
      isBookmarksCorrectTip,
      disabled_Bookmarks,
      handleRadioButtonOnChange,
		dataField,
	} = props.data;

	return (
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-radiogroup-label'>{props.language.hasBookmarks}</FormLabel>
					<RadioGroup
						id='audioDescr-radiogroup'
						aria-describedby='audioDescr-exp'
						aria-labelledby='audioDescr-radiogroup-label'
						name='Bookmarks'
						row
						value={dataField.hasBookmarks}
						onChange={handleRadioButtonOnChange}
					>
						<FormControlLabel
							id='audioDescr-yes'
							name='hasBookmarks'
							label={props.language.yes}
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
							role='radio'
						/>
						<FormControlLabel
							id='audioDescr-no'
							name='hasBookmarks'
							label={props.language.no}
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.hasBookmarksError} tip={hasBookmarksTip} />
				</FormControl>
			</Grid>	
			<Grid item>
			<FormControl component='fieldset' disabled={disabled_Bookmarks}>
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isBookmarksCorrect}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='isBookmarksCorrect'
					value={dataField.isBookmarksCorrect}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='isBookmarksCorrect'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='isBookmarksCorrect'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isBookmarksCorrectError} tip={isBookmarksCorrectTip} />
			</FormControl>
		</Grid>

      <Grid item>
			<FormControl component='fieldset' >
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.screenReader}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='screenReader'
					value={dataField.screenReader}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='screenReader'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='screenReader'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.screenReaderError} tip={screenReaderTip} />
			</FormControl>
		</Grid>
      <Grid item>
			<FormControl component='fieldset' >
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.focusOrder}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='screenReader'
					value={dataField.focusOrder}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='focusOrder'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='focusOrder'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.focusOrderError} tip={focusOrderTip} />
			</FormControl>
         </Grid>

      
      </Grid>
	);
}

export  function PdfAccessibilityStructures(props) {
      const {
         hasTitleTip,
         hasNumberingTip,
         hasLanguageTip,
         hasLanguagePartTip,
         handleRadioButtonOnChange,
         dataField,
      } = props.data;
   
      return (
         <Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
            <Grid item>
               <FormControl component='fieldset' >
                  <FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasTitle}</FormLabel>
                  <RadioGroup
                     id='audioDescr-necessary-radiogroup'
                     aria-describedby='audioDescr-necessary-exp'
                     aria-labelledby='audioDescr-necessary-radiogroup-label'
                     name='hasTitle'
                     value={dataField.hasTitle}
                     onChange={React.useCallback(handleRadioButtonOnChange)}
                  row>
                     <FormControlLabel
                        id='audioDescr-necessary-yes'
                        name='hasTitle'
                        label='Yes'
                        value='yes'
                        control={<Radio color='primary' />}
                        labelPlacement='end'
                     />
                     <FormControlLabel
                        id='audioDescr-necessary-no'
                        name='hasTitle'
                        label='No'
                        value='no'
                        control={<Radio color='secondary' />}
                        labelPlacement='end'
                     />
                  </RadioGroup>
                  <AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasTitleError} tip={hasTitleTip} />
               </FormControl>
            </Grid>
            <Grid item>
               <FormControl component='fieldset' >
                  <FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasNumbering}</FormLabel>
                  <RadioGroup
                     id='audioDescr-necessary-radiogroup'
                     aria-describedby='audioDescr-necessary-exp'
                     aria-labelledby='audioDescr-necessary-radiogroup-label'
                     name='hasNumbering'
                     value={dataField.hasNumbering}
                     onChange={React.useCallback(handleRadioButtonOnChange)}
                  row>
                     <FormControlLabel
                        id='audioDescr-necessary-yes'
                        name='hasNumbering'
                        label='Yes'
                        value='yes'
                        control={<Radio color='primary' />}
                        labelPlacement='end'
                     />
                     <FormControlLabel
                        id='audioDescr-necessary-no'
                        name='hasNumbering'
                        label='No'
                        value='no'
                        control={<Radio color='secondary' />}
                        labelPlacement='end'
                     />
                  </RadioGroup>
                  <AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasNumberingError} tip={hasNumberingTip} />
               </FormControl>
            </Grid>
            <Grid item>
               <FormControl component='fieldset' >
                  <FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasLanguage}</FormLabel>
                  <RadioGroup
                     id='audioDescr-necessary-radiogroup'
                     aria-describedby='audioDescr-necessary-exp'
                     aria-labelledby='audioDescr-necessary-radiogroup-label'
                     name='hasLanguage'
                     value={dataField.hasLanguage}
                     onChange={React.useCallback(handleRadioButtonOnChange)}
                  row>
                     <FormControlLabel
                        id='audioDescr-necessary-yes'
                        name='hasLanguage'
                        label='Yes'
                        value='yes'
                        control={<Radio color='primary' />}
                        labelPlacement='end'
                     />
                     <FormControlLabel
                        id='audioDescr-necessary-no'
                        name='hasLanguage'
                        label='No'
                        value='no'
                        control={<Radio color='secondary' />}
                        labelPlacement='end'
                     />
                  </RadioGroup>
                  <AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasLanguageError} tip={hasLanguageTip} />
               </FormControl>
            </Grid>
            <Grid item>
               <FormControl component='fieldset' >
                  <FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasLanguagePart}</FormLabel>
                  <RadioGroup
                     id='audioDescr-necessary-radiogroup'
                     aria-describedby='audioDescr-necessary-exp'
                     aria-labelledby='audioDescr-necessary-radiogroup-label'
                     name='hasLanguagePart'
                     value={dataField.hasLanguagePart}
                     onChange={React.useCallback(handleRadioButtonOnChange)}
                  row>
                     <FormControlLabel
                        id='audioDescr-necessary-yes'
                        name='hasLanguagePart'
                        label='Yes'
                        value='yes'
                        control={<Radio color='primary' />}
                        labelPlacement='end'
                     />
                     <FormControlLabel
                        id='audioDescr-necessary-no'
                        name='hasLanguagePart'
                        label='No'
                        value='no'
                        control={<Radio color='secondary' />}
                        labelPlacement='end'
                     />
                  </RadioGroup>
                  <AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasLanguagePartError} tip={hasLanguagePartTip} />
               </FormControl>
            </Grid>
         </Grid>
	);
}

export function PdfAccessibilityForm(props) {
	const {
		hasFormTip,
		hasRequiredFieldsTip,
		isRequiredFieldsTip,
		hasLabelsTip,
      handleRadioButtonOnChange,
		disabled_Form,
		disabled_hasRequiredFields,
		dataField,
	} = props.data;

	return (
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-radiogroup-label'>{props.language.hasForm}</FormLabel>
					<RadioGroup
						id='audioDescr-radiogroup'
						aria-describedby='audioDescr-exp'
						aria-labelledby='audioDescr-radiogroup-label'
						name='hasForm'
						row
						value={dataField.hasForm}
						onChange={handleRadioButtonOnChange}
					>
						<FormControlLabel
							id='audioDescr-yes'
							name='hasForm'
							label={props.language.yes}
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
							role='radio'
						/>
						<FormControlLabel
							id='audioDescr-no'
							name='hasForm'
							label={props.language.no}
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.hasFormError} tip={hasFormTip} />
				</FormControl>
			</Grid>	

			<Grid item>
			<FormControl component='fieldset' disabled={disabled_Form}>
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasRequiredFields}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='hasRequiredFields'
					value={dataField.hasRequiredFields}
					onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='hasRequiredFields'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='hasRequiredFields'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasFormError} tip={hasRequiredFieldsTip} />
			</FormControl>
		</Grid>

		<Grid item>
			<FormControl component='fieldset' disabled={disabled_hasRequiredFields}>
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isRequiredFields}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='isRequiredFields'
					value={dataField.isRequiredFields}
					onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='isRequiredFields'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='isRequiredFields'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasFormError} tip={isRequiredFieldsTip} />
			</FormControl>
		</Grid>

		<Grid item>
			<FormControl component='fieldset' disabled={disabled_Form}>
				<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.hasLabels}</FormLabel>
				<RadioGroup
					id='audioDescr-necessary-radiogroup'
					aria-describedby='audioDescr-necessary-exp'
					aria-labelledby='audioDescr-necessary-radiogroup-label'
					name='hasLabels'
					value={dataField.hasLabels}
					onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
					<FormControlLabel
						id='audioDescr-necessary-yes'
						name='hasLabels'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='audioDescr-necessary-no'
						name='hasLabels'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.hasLabelsError} tip={hasLabelsTip} />
			</FormControl>
		</Grid>
      </Grid>
      
	);
}

export  function PdfAccessibilitytextContent(props) {
	const {
		isTableTip,
		isListTip,
		isAbbreviationTip,
		isHeadingsTip,
		isLinkTip,
		handleRadioButtonOnChange,
		dataField,
	} = props.data;

	return (
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isTable}</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='isTable'
						value={dataField.isTable}
						onChange={React.useCallback(handleRadioButtonOnChange)}
						row
					>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='isTable'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='isTable'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isTableError} tip={isTableTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isList}</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='isList'
						value={dataField.isList}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='isList'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='isList'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isListError} tip={isListTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isAbbreviation}</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='isAbbreviation'
						value={dataField.isAbbreviation}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='isAbbreviation'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='isAbbreviation'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isAbbreviationError} tip={isAbbreviationTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isHeadings}</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='isHeadings'
						value={dataField.isHeadings}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='isHeadings'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='isHeadings'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isHeadingsError} tip={isHeadingsTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-necessary-label'>{props.language.isLink}</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='isLink'
						value={dataField.isLink}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='isLink'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='isLink'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.isLinkError} tip={isLinkTip} />
				</FormControl>
			</Grid>
		</Grid>
);
}



export const usePdfDataField = (props) => {
	console.log("props de ingreso en pdf dtafiled", props)
	const [dataField, setDataField] = React.useState({
      hasImage:null,
      hasAlt:null,
      hasBookmarks:null,
      isBookmarksCorrect:null,
      hasNumbering:null,
      focusOrder:null,
      hasTitle:null,
      hasNumbering:null,
      hasLanguagePart:null,
		hasLanguage:null,
		hasForm:null,
		hasRequiredFields:null,
		isRequiredFields:null,
		hasLabels:null,
		isTable:null,
		isList:null,
		isAbbreviation:null,
		isHeadings:null,
		isLink:null,
		//error states
		isTableError:true,
		isListError:true,
		isAbbreviationError:true,
		isHeadingsError:true,
		isLinkError:true,
		hasFormError:true,
		hasRequiredFieldsError:true,
		isRequiredFieldsError:true,
		hasLabelsError:true,
      hasTitleError:true,
      hasNumberingError:true,
      hasLanguagePartError:true,
      hasLanguageError:true,
      focusOrderError:true,
      screenReaderError:true,
      hasBookmarksError:true,
      hasImageError : true,
      hasAltError : true,
      hasBookmarksError : true,
      isBookmarksCorrectError : true,
	});

	const [hasImageTip, sethasImageTip] = React.useState(props.language.hasImageTip);
	const [hasAltTip, sethasAltTip] = React.useState(props.language.hasAltTip);
   const [hasBookmarksTip, sethasBookmarksTip] = React.useState(props.language.hasBookmarksTip);
   const [isBookmarksCorrectTip, setisBookmarksCorrectTip] = React.useState(props.language.isBookmarksCorrectTip);
   const [screenReaderTip, setscreenReaderTip] = React.useState(props.language.screenReaderTip);
   const [focusOrderTip, setfocusOrderTip] = React.useState(props.language.focusOrderTip);
   const [hasTitleTip, sethasTitleTip] = React.useState(props.language.hasTitleTip);
   const [hasNumberingTip, sethasNumberingTip] = React.useState(props.language.hasNumberingTip);
   const [hasLanguageTip, sethasLanguageTip] = React.useState(props.language.hasLanguageTip);
   const [hasLanguagePartTip, sethasLanguagePartTip] = React.useState(props.language.hasLanguagePartTip);
	const [hasFormTip, sethasFormTip] = React.useState(props.language.hasFormTip);
   const [hasRequiredFieldsTip, sethasRequiredFieldsTip] = React.useState(props.language.hasRequiredFieldsTip);
	const [isRequiredFieldsTip, setisRequiredFieldsTip] = React.useState(props.language.isRequiredFieldsTip);
	const [hasLabelsTip, sethasLabelsTip] = React.useState(props.language.hasLabelsTip);
	const [isTableTip, setisTableTip] = React.useState(props.language.isTableTip);
	const [isListTip, setisListTip] = React.useState(props.language.isListTip);
	const [isAbbreviationTip, setisAbbreviationTip] = React.useState(props.language.isAbbreviationTip);
	const [isHeadingsTip, setisHeadingsTip] = React.useState(props.language.isHeadingsTip);
	const [isLinkTip, setisLinkTip] = React.useState(props.language.isLinkTip);
	
	const a11yInitial = [
      {name: 'hasImage', is_a11y: null},
		//{name: 'hasAlt', is_a11y: null},
      {name: 'hasBookmarks', is_a11y: null},
      //{name: 'isBookmarksCorrect', is_a11y: null},
      {name: 'screenReader', is_a11y: null},
      {name: 'focusOrder', is_a11y: null},
      {name: 'hasTitle', is_a11y: null},
      {name: 'hasNumbering', is_a11y: null},
      {name: 'hasLanguage', is_a11y: null},
		{name: 'hasLanguagePart', is_a11y: null},
		{name: 'hasForm', is_a11y: null},
      //{name: 'hasRequiredFields', is_a11y: null},
      {name: 'isRequiredFields', is_a11y: null},
      {name: 'hasLabels', is_a11y: null},
      {name: 'isTable', is_a11y: null},
      {name: 'isList', is_a11y: null},
      {name: 'isAbbreviation', is_a11y: null},
      {name: 'isHeadings', is_a11y: null},
      {name: 'isLink', is_a11y: null},
	];

	useEffect(() => {
		if (props.itemAll.accessibility.dataField && (props.itemAll.isA11Y || props.itemAll.accessibility.isA11Y)) {
			setDataField(props.itemAll.accessibility.dataField);
			if(props.itemAll.accessibility.isA11Y){
				setIsA11Y(props.itemAll.accessibility.isA11Y);
			}else{
				setIsA11Y(props.itemAll.isA11Y);
			}
			
		}
	}, [])

	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);
   const [disabled_image,setDisabled_image] = React.useState(true);
   const [disabled_Bookmarks,setDisabled_Bookmarks] = React.useState(true);
	const [disabled_Form,setDisabled_Form] = React.useState(true);
	const [disabled_hasRequiredFields,sethasRequiredFields] = React.useState(true);
   
	useEffect(() => {
      if(dataField.hasImage!=null){
         setDisabled_image((dataField.hasImage === 'no'));
      }
      if(dataField.hasBookmarks!=null){
         setDisabled_Bookmarks((dataField.hasBookmarks === 'no'));
		}
		if(dataField.hasForm!=null){
         setDisabled_Form((dataField.hasForm === 'no'));
		}
		if(dataField.hasRequiredFields!=null){
         sethasRequiredFields((dataField.hasRequiredFields === 'no'));
      }
		//setDisabled_uploadAudioDesc((disabled_necAudioDesc? disabled_necAudioDesc : (dataField.audioDescriptionRequired === undefined || dataField.audioDescriptionRequired ==='no')));
	}, [dataField]);
   

	function handleRadioButtonOnChange ({ target: { name, value } }){
		let data = {
			[name]: value,
		};
		//console.log( "name" ,name, "value", "data----",data, "datafiled",dataField)
		if(name === 'hasImage'){         
         let errValue =""
			if(value==="yes") { 
            errValue=true
         }else {
            errValue=false
         }
			data = {...data,
				hasAlt: value === 'no' ? value : dataField.hasAlt,
				hasImageError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
		}
		else if (name === 'hasAlt'){
         let errValue =""
			if(dataField.hasImage === 'yes' && value==="yes") { 
            errValue=false
         }else if(dataField.hasImage === 'yes' && value==="no"){
            errValue=true
         }
			data = {...data,
				hasImageError: errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasImage').is_a11y = !errValue;
         setIsA11Y(arr);
		}
		
      //for Navigation Tab
      if(name === "hasBookmarks"){         
			let errValue =""
			if(value === 'yes' ) { 
            errValue=true
         }else if(value === 'yes' && dataField.isBookmarksCorrect ==="yes"){
            errValue=false
         }
			data = {...data,
				isBookmarksCorrect:value === 'no' ? value : dataField.isBookmarksCorrect,
				hasBookmarksError: errValue,
				//isBookmarksCorrectError:errValue
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasBookmarks').is_a11y = !errValue;
         setIsA11Y(arr);
		}
		else if (name === 'isBookmarksCorrect'){
         let errValue =""
			if(dataField.hasBookmarks === 'yes' && value==="yes") { 
            errValue=false
         }else if(dataField.hasBookmarks === 'yes' && value==="no"){
            errValue=true
         }
			data = {...data,
				hasBookmarksError: errValue,
			};
         
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasBookmarks').is_a11y = !errValue;
         setIsA11Y(arr);
         
      }
      /* if(name === "hasBookmarks"){         
         let errValue =""
			if(value==="yes") { 
            errValue=true
         }else {
            errValue=false
         }
			data = {...data,
				isBookmarksCorrect: value === 'no' ? value : dataField.hasAlt,
				hasBookmarksError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
		} */
		if(name === "screenReader"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				screenReaderError:errValue,
				hasBookmarksError:errValue,
				isBookmarksCorrectError:errValue
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }
      if(name === "focusOrder"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				focusOrderError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }

      //Structures
      if(name === "hasTitle" || name === "hasNumbering" || name === "hasLanguage" || name === "hasLanguagePart"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			var nameError=`${name}`+'Error';
			data = {...data,
				[nameError]:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
		}
		
		//form
		if(name === 'hasForm'){         
         let errValue =""
			if(value==="yes") { errValue=true} else {errValue=false}
			
			data = {...data, hasRequiredFields: value === 'no' ? value : dataField.hasRequiredFields, hasFormError:errValue,};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
		}
		else if (name === 'hasRequiredFields'){
         let errValue =""
			if(dataField.hasForm === 'yes' && value==="yes" && (dataField.isRequiredFields === 'no' || dataField.isRequiredFields === null)) {errValue=true}
			else if(dataField.hasForm === 'yes' && value==="yes" && dataField.hasForm === 'yes') {errValue=false}
			else if(dataField.hasForm === 'yes' && value==="no"){errValue=true}
			else if(value === 'yes' && dataField.hasForm === 'yes' && dataField.isRequiredFields === 'yes'){
				errValue=false
			}
			data = {...data, hasFormError: errValue, };
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasForm').is_a11y = !errValue;
         setIsA11Y(arr);
		}
		else if (name === 'isRequiredFields'){
         let errValue =""
			if(dataField.hasRequiredFields === 'yes' && value==="yes") {errValue=false}
			else if(dataField.hasRequiredFields === 'yes' && value==="no"){errValue=true}
			data = {...data, hasFormError: errValue,};
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasForm').is_a11y = !errValue;
         setIsA11Y(arr);
		}
		else if (name === 'hasLabels'){
         let errValue =""
			if(dataField.hasForm === 'yes' && value==="yes") {errValue=false}
			else if(dataField.hasForm === 'yes' && value==="no"){errValue=true}
			data = {...data, hasLabelsError: errValue, };
			let arr = [...isA11Y]; 
			arr.find(a => a.name == 'hasLabels').is_a11y = !errValue;
         setIsA11Y(arr);
		}
		
		//textContent
		if(name === "isTable" || name === "isList" || name === "isAbbreviation" || name === "isHeadings" || name === "isLink" ){         
         let errValue =""
         if(value==="yes") {errValue=false}
			else {errValue=true}
			var nameError=`${name}`+'Error';
			data = {...data,
				[nameError]:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }
      
		setDataField( dataField => ({ ...dataField,
			...data
		}));
	}
	return  {
		hasFormTip,
		isRequiredFieldsTip,
		hasRequiredFieldsTip,
		hasLabelsTip,
		isTableTip,
		isListTip,
		isAbbreviationTip,
		isHeadingsTip,
		isLinkTip,
      hasTitleTip,
      hasNumberingTip,
      hasLanguageTip,
      hasLanguagePartTip,
      hasImageTip,
      hasAltTip,
      hasBookmarksTip,
      isBookmarksCorrectTip,
      screenReaderTip,
      focusOrderTip,
		handleRadioButtonOnChange:handleRadioButtonOnChange,
      dataField,
      disabled_image,
		disabled_Bookmarks,
		disabled_Form,
		disabled_hasRequiredFields,
		isA11Y,
	};
};
