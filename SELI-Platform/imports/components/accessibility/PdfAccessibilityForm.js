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


export  function PdfAccessibilityForm(props) {
   
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
      
      //error states
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

	const a11yInitial = [
      {name: 'hasImage', is_a11y: null},
		{name: 'hasAlt', is_a11y: null},
      {name: 'hasBookmarks', is_a11y: null},
      {name: 'isBookmarksCorrect', is_a11y: null},
      {name: 'screenReader', is_a11y: null},
      {name: 'focusOrder', is_a11y: null},
      {name: 'hasTitle', is_a11y: null},
      {name: 'hasNumbering', is_a11y: null},
      {name: 'hasLanguage', is_a11y: null},
      {name: 'hasLanguagePart', is_a11y: null},
	];

	useEffect(() => {
		console.log("PDF tab",props)
		if (props.item.dataField && props.item.isA11Y) {
			setDataField(props.item.dataField);
			setIsA11Y(props.item.isA11Y);
		}
	}, [])

	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);
   const [disabled_image,setDisabled_image] = React.useState(true);
   const [disabled_Bookmarks,setDisabled_Bookmarks] = React.useState(true);
   
   

	useEffect(() => {
      if(dataField.hasImage!=null){
         setDisabled_image((dataField.hasImage === 'no'));
      }
      if(dataField.hasBookmarks!=null){
         setDisabled_Bookmarks((dataField.hasBookmarks === 'no'));
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
         console.log( "en el caso de else name" ,name, "value",value ,"data----",data, "datafiled",dataField)
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasImage').is_a11y = !errValue;
         setIsA11Y(arr);
         console.log('ELSE if setIsA11Y',arr)
      }
      //for Navigation Tab
      if(name === "hasBookmarks"){         
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
         console.log( "en el caso de else name" ,name, "value",value ,"data----",data, "datafiled",dataField)
			let arr = [...isA11Y];
			arr.find(a => a.name == 'hasBookmarks').is_a11y = !errValue;
         setIsA11Y(arr);
         console.log('ELSE if setIsA11Y',arr)
      }

      if(name === "hasBookmarks"){         
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
		}

		if(name === "screenReader"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				screenReaderError:errValue,
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
      if(name === "hasTitle"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				hasTitleError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }if(name === "hasNumbering"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				hasNumberingError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }if(name === "hasLanguage"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				hasLanguageError:errValue,
			};
			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
         setIsA11Y(arr);
      }if(name === "hasLanguagePart"){         
         let errValue =""
         if(value==="yes") {errValue=false}
         else {errValue=true}
			data = {...data,
				hasLanguagePartError:errValue,
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
		isA11Y,
	};
};
